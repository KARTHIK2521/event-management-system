import { Component, OnInit  } from '@angular/core';

import { EventService } from 'src/app/shared/services/event-services/event.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


   cardDataList:any=[];

   eventImages=[
    {id:1, src:'https://angular.dev/assets/images/ng-image.jpg',eType:'Angular'},
    {id:2, src:'https://www.patterns.dev/img/reactjs/react-logo@3x.svg',eType:'React'},
    {id:3, src:'https://www.beartai.com/wp-content/uploads/2023/01/aws.jpg',eType:'AWS'},
    {id:4, src:'https://a.storyblok.com/f/42126/1a01e12825/understanding-rxjs.png/m/800x0/filters:quality(70)/',eType:'Rxjs'},
    {id:5, src:'https://mevn-public.s3-ap-southeast-1.amazonaws.com/marketenterprise.vn/wp-images/2021/04/06170614/vuejs.png',eType:'Vue'}
   ]

constructor(  private _eventService: EventService ){}


  ngOnInit(): void {
    this.showAllEventsList()
  }

  showAllEventsList(){
        this._eventService.getAllEvent().subscribe({
          next :(res) => {

              this.cardDataList=res
          },
          error: console.error,
        })
      }





}
