import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Event } from '../../interface/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = "http://localhost:3000/eventsList";

  private eventsSubject= new BehaviorSubject<any[]>([]) ;
  events$ = this.eventsSubject.asObservable();

  constructor(private _http: HttpClient) {
   this.loadEvents();
  }

   loadEvents(){
    this._http.get<any[]>(this.apiUrl).subscribe(events=>{
      this.eventsSubject.next(events);
    })
  }

  getAllEvent(): Observable <any[]>{
    this.events$.subscribe(value=>{
      // console.log(value)
    })
   return this.events$;
  }

  addEventNew(eventsData:any) : Observable <any> {
      return this._http.post<any>(this.apiUrl,eventsData).pipe(
      tap(() =>{
        this.loadEvents();
      })
     )
  }

  updateEventNew(updatedEventData:any, id: number): Observable <any> {
    return  this._http.put<any>(`${this.apiUrl}/${id}`,updatedEventData).pipe(
      tap((updatedEvent)=>{
        // console.log(updatedEventData);
          this.loadEvents();
      },)
    );
  }

  deleteEventNew(eventId:number): Observable <any>{
    return this._http.delete<any>(`http://localhost:3000/eventsList/${eventId}`).pipe(
      tap(()=>{
         this.loadEvents();
      })
    )
  }



}
