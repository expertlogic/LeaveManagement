import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveRequestService } from '@app/_services/leaverequest.service';
import { StorageService } from '@app/_services/storage.service';


@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  leaveTypes!: any[];
  leaveRequestForm: FormGroup;
  isRequestSent = false;
  errorMsg = "";
  @Output() saveForm = new EventEmitter();

  min = new Date();
  max = new Date();
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  user: any;
  error: any;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, public leaveRequestService: LeaveRequestService, storage: StorageService) {
    this.max.setDate(this.max.getDate() + 30);
    this.user = storage.getUser();

    this.leaveRequestForm = this.formBuilder.group({
      leaveTypeId: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      isTravelRequired: [Boolean, false],
      requestComments: ['']
    });
  }

  ngOnInit(): void {
    this.GetLeaveTypesData();
  }
  GetLeaveTypesData() {
    this.leaveRequestService.getleavetypes().subscribe(result => {
      this.leaveTypes = result;
    });
  }
  checkCheckBoxvalue($event: any) {
    debugger;
    this.leaveRequestForm.value.isTravelRequired = $event.checked;
  }
  onSubmit() {
    if (this.leaveRequestForm.invalid || this.isRequestSent) {
      return;
    }
    this.isRequestSent = true;

    var formValues = this.leaveRequestForm.value;

    var leaveRequest = {
      startDate: new Date(formValues.startDate).toDateString(),
      endDate: new Date(formValues.endDate).toDateString(),
      leaveTypeId: formValues.leaveTypeId,
      isTravelRequired: formValues.isTravelRequired,
      requestComments: formValues.requestComments
    }
    debugger;
    this.leaveRequestService.createLeaveRequest(leaveRequest).subscribe({
      next: data => {
        this.errorMsg = "";
        this.isRequestSent = false;
        this.leaveTypes = data;
        alert("saved successfully");
        this.saveForm.emit();
      },
      error: error => {
        this.errorMsg = error;
        this.isRequestSent = false;
      }
    } )
  }

}
