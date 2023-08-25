import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LeaveManagementRoutingModule } from './leavemanagement-routing.module';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    LeaveRequestComponent,
    DashboardComponent
  ],
  imports: [
    MatNativeDateModule , MatCheckboxModule, MatDatepickerModule, CommonModule ,ReactiveFormsModule ,LeaveManagementRoutingModule,MatFormFieldModule, MatSelectModule, NgFor, MatInputModule, FormsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class LeaveManagementModule { }
