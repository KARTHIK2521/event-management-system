import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { authGuard } from './shared/guard/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ViewEventListComponent } from './components/view-event-list/view-event-list.component';
import { EditDeleteEventComponent } from './components/edit-delete-event/edit-delete-event.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegistrationComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    canActivate:[authGuard],
  },
  {
    path:'vieweventlist',
    component:ViewEventListComponent,
    canActivate:[authGuard],
  },
  {
    path:'editAndDeleteEvent',
    component: EditDeleteEventComponent,
    canActivate:[authGuard],
  },

  {
    path:'**',
    component:PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
