import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthGaurd } from '@app/_shared/AuthGuard';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {

    path: '',
    children: [
      { path: 'request', component: LeaveRequestComponent, canActivate: [AuthGaurd] },
      { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGaurd] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveManagementRoutingModule {
  static components = [LeaveRequestComponent]
}
