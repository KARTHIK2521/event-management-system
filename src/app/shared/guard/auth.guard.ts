import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';




export const authGuard: CanActivateFn = (route, state) => {

  const router=Inject(Router)

  const sessiondata=sessionStorage.getItem('username');

  if(sessiondata !== null){
    return true;
  } else{
   router.navigateByUrl('login');
    return false;
  }

};
