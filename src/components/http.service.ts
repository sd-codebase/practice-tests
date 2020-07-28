import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

const host = environment.apiUrl;

@Injectable()
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
