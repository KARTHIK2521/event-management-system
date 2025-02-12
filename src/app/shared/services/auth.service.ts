import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private userLoggedIn = new BehaviorSubject<boolean>(this.checkUserLoginStatus());

   _isUserLoggedIn = this.userLoggedIn.asObservable();
   private apiUrl = "http://localhost:3000/users";


   constructor(private _http: HttpClient) { }


    userLogin(username: string , password : string) : Observable<boolean>{
      return this._http.get<any[]>(this.apiUrl).pipe(
        map((users) =>{
          const user= users.find((res:any)=> res.username === username &&
          res.password === password);
          if(user){
            sessionStorage.setItem('isUserAuthenticated', 'true');
            this.userLoggedIn.next(true);
            return true;
          }
          return false;
        })
      )
    }


  logOut() : void{
    sessionStorage.removeItem('isUserAuthenticated');
    this.userLoggedIn.next(false);
  }

  private checkUserLoginStatus(): boolean{
    return sessionStorage.getItem('isUserAuthenticated') === 'true'
  }



  ProceedRegister(userdata:any){
    return this._http.post(this.apiUrl,userdata);
  }




}
