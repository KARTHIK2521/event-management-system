import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEventComponent } from '../add-event/add-event.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLoggedIn=false;

  constructor(private route:Router , private _dailog: MatDialog ,private _authService: AuthService){
    this._authService._isUserLoggedIn.subscribe((userLoggedIn)=>{

      this.isLoggedIn= userLoggedIn;

    })
  }

  openAddEventComponent(){
    this._dailog.open(AddEventComponent,{width:'650px'});
  }

  onLogOff(){
    this._authService.logOut()
    sessionStorage.clear();
    this.route.navigateByUrl("login");
  }

}
