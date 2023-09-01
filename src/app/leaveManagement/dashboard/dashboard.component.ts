import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveRequestService } from '@app/_services/leaverequest.service';
import { StorageService } from '@app/_services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  data: any;
  viewleaveForm: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router, public leaveRequestService: LeaveRequestService, storage: StorageService) {
  }

  ngOnInit(): void {
    this.data = {};
    this.GetDashboardData();
  }
  fnChangeView() {
    this.viewleaveForm = !this.viewleaveForm;
    if (!this.viewleaveForm) {
      this.GetDashboardData();
    }
  }
  GetDashboardData() {
    this.leaveRequestService.getUserBoard().subscribe(result => {
      this.data = result;
    });
  }
}
