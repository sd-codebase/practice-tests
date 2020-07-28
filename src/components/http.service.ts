import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { StorageService } from './storage.serice';

const host = environment.apiUrl;

@Injectable()
export class HttpService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  get(url, params?): Observable<any> {
    return this.http.get(host + url, {params, headers: this.getHeaders()});
  }

  post(url, data?) {
    return this.http.post(host + url, data, { headers: this.getHeaders() });
  }

  put(url, data?) {
    return this.http.put(host + url, data, { headers: this.getHeaders() });
  }

  delete(url, params?): Observable<any> {
    return this.http.delete(host + url, { params, headers: this.getHeaders()});
  }

  getHeaders() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.storage.getToken(),
    });
    return headers;
  }
}
