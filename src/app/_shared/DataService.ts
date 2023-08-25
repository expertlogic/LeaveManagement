import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseData } from './ResponseData';
import { StorageService } from '@app/_services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl: string = ''
    httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private httpClient: HttpClient, public storageService: StorageService
  ) {
    this.baseUrl = `${environment.apiUrl}/`;
    var user = storageService.getUser();
    if (user.token != undefined) {

      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        })
      };
    }

  }

  get<T>(url: string, id?: number | boolean, params?: any, headers?: any): Observable<T> {


    if (id !== null && id !== undefined) {
      return this.httpClient.get<T>(`${this.baseUrl}${url}/${id}`, this.httpOptions);
    } else {
      return this.httpClient.get<T>(`${this.baseUrl}${url}`, this.httpOptions);
    }
  }

  post<T>(url: string, data: any): Observable<T> {
    debugger;
    return this.httpClient.post<T>(`${this.baseUrl}${url}`, data, this.httpOptions);
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.httpClient.put<T>(`${this.baseUrl}${url}`, data, this.httpOptions);
  }

  delete<T>(url: string, id: number): Observable<T> {
    return this.httpClient.delete<T>(`${this.baseUrl}${url}/${id}`);
  }

  patch<T>(url: string, id: number, data?: any): Observable<T> {
    return this.httpClient.patch<T>(`${this.baseUrl}${url}/${id}`, data);
  }
}
// type optionheaders = {
//   [key: string]: any; //
// };
