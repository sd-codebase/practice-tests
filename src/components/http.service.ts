import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const host = 'https://test-for-all-services.herokuapp.com/api';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url) {
    return this.http.get(host + url);
  }

  post(url, data?) {
    return this.http.post(host + url, data);
  }

  put(url, data?) {
    return this.http.put(host + url, data);
  }
}
