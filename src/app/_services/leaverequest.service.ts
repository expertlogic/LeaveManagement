import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { DataService } from '@app/_shared/DataService';


@Injectable({
  providedIn: 'root',
})
export class LeaveRequestService {
  constructor(private dataService: DataService) {}


  getleavetypes(): Observable<any[]> {
    return this.dataService.get<any[]>(`leavetypes`);
    }
  getUserBoard(): Observable<any> {
    return this.dataService.get<any>(`leaveRequest`);
  }
  createLeaveRequest(form : any): Observable<any> {
    return this.dataService.post<any>(`leaveRequest/Create` , form);
  }
  // getModeratorBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'mod', { responseType: 'text' });
  // }

  // getAdminBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'admin', { responseType: 'text' });
  // }
}
