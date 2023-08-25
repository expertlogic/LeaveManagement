import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AppComponent } from '../app.component';
import { AuthGaurd } from '@app/_shared/AuthGuard';

const routes: Routes = [
  {

    path: '',
    children: [
    //  {path:"" , redirectTo:"/auth/login" , pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent  , canActivate:[AuthGaurd]},
     { path: '', redirectTo: 'home', pathMatch: 'full' , }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
  static components = [LoginComponent, RegisterComponent, ProfileComponent]
}
