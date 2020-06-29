import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const host = 'https://test-for-all-services.herokuapp.com/api';
// const host = 'http://localhost:3000/api';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url, params?): Observable<any> {
    return this.http.get(host + url, params);
  }

  post(url, data?) {
    return this.http.post(host + url, data);
  }

  put(url, data?) {
    return this.http.put(host + url, data);
  }

  delete(url, params?): Observable<any> {
    return this.http.delete(host + url, params);
  }
}
