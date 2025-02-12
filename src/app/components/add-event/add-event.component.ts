import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/app/shared/services/event-services/event.service';
import { SnackbarService } from 'src/app/shared/services/snackbar-service/snackbar.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  eventAddForm : FormGroup

  eventTypesList=['Angular','React','AWS','Vue','Rxjs']

  today=new Date();
  minDate=new Date(this.today.getFullYear(),
  this.today.getMonth(),this.today.getDate());


 constructor(private _eventService:EventService,  private _snackBar: SnackbarService,
  private _dailog: MatDialogRef<AddEventComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any ) {

  this.eventAddForm= new FormGroup({
    eventName: new FormControl("", [Validators.required,Validators.minLength(5),Validators.maxLength(25)]),
    eventType: new FormControl("", [Validators.required]),
    aboutEvent: new FormControl("", [Validators.required,Validators.minLength(15),Validators.maxLength(60)]),
    eventLocation: new FormControl("", [Validators.required,Validators.maxLength(12)]),
    eventDate: new FormControl("", [Validators.required]),
    eventTime: new FormControl("", [Validators.required]),
    eventPrice: new FormControl("", [Validators.required]),
    eventDuration: new FormControl("", [Validators.required]),

  })


 }

  ngOnInit(): void {
    this.eventAddForm.patchValue(this.data);
  }



  onAddOrUpdateEvent(){


    if(this.eventAddForm.valid){
      if(this.data){
        this._eventService.updateEventNew(this.eventAddForm.value,this.data.id).subscribe((res)=>{
          this._snackBar.openSnackBar("Event Updated Successfully");
          this._dailog.close(this.data);
        })

      } else{
        this._eventService.addEventNew(this.eventAddForm.value).subscribe((res)=>{
          this._snackBar.openSnackBar("Event Added Successfully");
          this._dailog.close();
        },)
      }

    }
  }

  closeEventModal(){
    this._dailog.close();
  }




}
