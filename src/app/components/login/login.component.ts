import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar-service/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private builder: FormBuilder ,
    private _snackBar: SnackbarService, private route : Router,
     private _authService: AuthService ) {
      sessionStorage.clear();
  }

  logginFailed= false;
  loginData:any=[];
  hide = true;  // Password Eye icon

  loginForm= this.builder.group({
    username: this.builder.control("",Validators.required),
    password: this.builder.control("",Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
  })


  proceedLogin() : void {
    this.loginData=this.loginForm.value;

    if (this.loginForm.valid) {
      this._authService.userLogin(this.loginData.username,this.loginData.password).subscribe((res )=>{

        if(res){
          sessionStorage.setItem('username','true');
          this.route.navigate(['dashboard']);
          this._snackBar.openSnackBar("You have successfully logged in");
        }
        else{
          this._snackBar.openSnackBar("Invalid Credentials");
          this.logginFailed = true;
        }

      })
    }
    else{
      this._snackBar.openSnackBar("Invalid Credentials");
    }
    this.loginForm.reset();
  }



}
