import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '../auth/models/user';
import { StorageService } from './storage.service';
import { DataService } from '@app/_shared/DataService';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor( private storageService: StorageService,
        private router: Router, private dataService  :DataService,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }
    login(form : any): Observable<any> {
        return this.dataService.post<User>(`accounts/login`, form);
      }


    logout() {
        // remove user from local storage and set current user to null
        this.storageService.clean();
        this.userSubject.next(null);
        this.router.navigate(['/auth/login']);
    }
}
