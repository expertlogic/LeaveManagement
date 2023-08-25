import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../../_services/account.service'
import { StorageService } from '@app/_services/storage.service';
import { LeaveRequestService } from '@app/_services/leaverequest.service';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  registrationForm: FormGroup;
  loading = false;
  submitted = false;
  error?: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,private storageService : StorageService,
    private accountService: AccountService, public leaveRequestService: LeaveRequestService
  ) {
    // redirect to home if already logged in
    if (this.accountService.userValue) {
      this.router.navigate(['/']);
    }
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      //email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    // this.registrationForm = this.formBuilder.group({
    //     username: ['', Validators.required],
    //     password: ['', Validators.required]
    // });

  }
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  // convenience getter for easy access to form fields
  get formControls() { return this.registrationForm.controls; }
  reloadPage(): void {
    this.router.navigate(['/auth/profile']).then(() => {
      window.location.reload();

    });
  }



  onSubmit() {
    this.submitted = true;

    // reset alert on submit
    this.error = '';
    debugger;
    // stop here if form is invalid
    if (this.registrationForm.invalid) {
      return;
    }

    this.loading = true;

    var form = this.registrationForm.value;
    var data = {
      email: form.username,
      password: form.password
    };

    this.accountService.login(data).subscribe({
      next: data => {
        this.isLoginFailed = false;
        debugger;
        this.isLoggedIn = true;
        this.storageService.saveUser( data );
        this.reloadPage();
      },
      error: error => {
        this.error = error;
        this.loading = false;

      }
  })



  }
}
