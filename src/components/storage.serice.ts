import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getUserId() {
      return this.getUser().userId;
  }

  getUser() {
    return this.getItem(Storage.USER);
  }

  setUser(user) {
    this.setItem(Storage.USER, user);
  }

  private getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  private setItem(key, data) {
    return localStorage.setItem(key, JSON.stringify(data));
  }
}

export enum Storage {
    USER = 'user',
}
