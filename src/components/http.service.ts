import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { StorageService } from './storage.serice';
import { IEndpoint } from 'src/auth/authentication/authentication.service';

const host = environment.apiUrl;

@Injectable()
export class HttpService {
  private endpoints: IEndpoint[];
  private course: string;
  constructor(private http: HttpClient, private storage: StorageService) {
    this.endpoints = this.storage.getEndpoints();
    this.course = this.storage.getMyCourse();
  }

  get(url, params?): Observable<any> {
    const api = this.getHost(url);
    return this.http.get(api + url, {params, headers: this.getHeaders()});
  }

  post(url, data?) {
    const api = this.getHost(url);
    return this.http.post(api + url, data, { headers: this.getHeaders() });
  }

  put(url, data?) {
    const api = this.getHost(url);
    return this.http.put(api + url, data, { headers: this.getHeaders() });
  }

  delete(url, params?): Observable<any> {
    const api = this.getHost(url);
    return this.http.delete(api + url, { params, headers: this.getHeaders()});
  }

  getHost(url) {
    return url.indexOf('/users') !== 0 && this.endpoints[this.course] ? this.endpoints[this.course] + 'api' : host;
  }

  getHeaders() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.storage.getToken(),
    });
    return headers;
  }
}
