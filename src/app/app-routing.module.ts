import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGaurd } from './_shared/AuthGuard';
import { PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {

         path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),

        },
        {

          path: 'leave', loadChildren: () => import('./leaveManagement/leavemanagement.module').then((m) => m.LeaveManagementModule),

         }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
