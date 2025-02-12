import { Component , OnInit, ViewChild,} from '@angular/core';

import { EventService } from 'src/app/shared/services/event-services/event.service';

import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { EventDetailsComponent } from './event-details/event-details.component';

@Component({
  selector: 'app-view-event-list',
  templateUrl: './view-event-list.component.html',
  styleUrls: ['./view-event-list.component.css']
})
export class ViewEventListComponent  implements OnInit {

  displayedColumns: string[] = ['id', 'eventName', 'aboutEvent', 'eventDate' ,
    'eventTime', 'eventDuration', 'eventLocation', 'eventPrice', 'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private _eventService: EventService , private _dailogRef: MatDialog){}


    ngOnInit(): void {
      this.showAllEventsList();
    }

    showAllEventsList(){
      this._eventService.getAllEvent().subscribe({
        next :(res) => {

            this.dataSource= new MatTableDataSource(res);
            this.dataSource.sort=this.sort;
            this.dataSource.paginator=this.paginator;
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

    openViewEventDetailsDialog(clickEventDetail:any){
      this._dailogRef.open(EventDetailsComponent,{
         width:'90%',
         maxWidth:'1150px',
          data:clickEventDetail
      })
    }
}
