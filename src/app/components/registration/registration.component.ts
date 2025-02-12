import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar-service/snackbar.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private builder: FormBuilder , private _snackBar: SnackbarService,
    private route : Router, private _authService: AuthService ) {
  }

  hide = true;  //Password Eye icon


  registerForm= this.builder.group({
    username: this.builder.control("",Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(16)])),
    password: this.builder.control("",Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),Validators.maxLength(10)])),
    email : this.builder.control("", Validators.compose([Validators.required, Validators.email])),
    city: this.builder.control("",Validators.required),
  })

  proceedRegister(){

    if (this.registerForm.valid) {
        this._authService.ProceedRegister(this.registerForm.value).subscribe( res =>{
          this._snackBar.openSnackBar("Registered Successfully");
          this.route.navigate(["login"]);
        });

    } else {
      this._snackBar.openSnackBar("Please Enter a Valid data");
    }
    this.registerForm.reset();

  }


}
