import { Component , OnInit, ViewChild} from '@angular/core';

import { EventService } from 'src/app/shared/services/event-services/event.service';

import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEventComponent } from '../add-event/add-event.component';
import { SnackbarService } from 'src/app/shared/services/snackbar-service/snackbar.service';

@Component({
  selector: 'app-edit-delete-event',
  templateUrl: './edit-delete-event.component.html',
  styleUrls: ['./edit-delete-event.component.css']
})
export class EditDeleteEventComponent  implements OnInit{

  displayedColumns: string[] = ['id', 'eventName', 'aboutEvent', 'eventDate' ,
    'eventTime', 'eventDuration', 'eventLocation', 'eventPrice', 'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _eventService: EventService , private _snackBar: SnackbarService,
     private _dailog: MatDialog
  ){}

    ngOnInit(): void {
      this.showAllEventsList();
    }

    showAllEventsList(){

      this._eventService.getAllEvent().subscribe({
        next :(res) => {
            this.dataSource= new MatTableDataSource(res);
            this.dataSource.sort=this.sort;
            this.dataSource.paginator=this.paginator
        },
        error: console.error,
      })
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    deleteEventById(id:number){
      this._eventService.deleteEventNew(id).subscribe({
        next: (res) => {
          this._snackBar.openSnackBar("Event Deleted");
          this.showAllEventsList();
        },
        error: console.log,
      })
    }

    editEventByRow(data:any){
      this._dailog.open(AddEventComponent,{
        data,
      });

    }

}
