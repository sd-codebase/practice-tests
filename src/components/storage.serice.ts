import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  getUserId() {
      return this.getUser()._id;
  }

  getUser() {
    return this.getItem(Storage.USER);
  }

  setUser(user) {
    this.setItem(Storage.USER, user);
  }

  removeToken() {
    this.setItem(Storage.TOKEN, '');
  }

  setToken(token) {
    this.setItem(Storage.TOKEN, token);
  }

  getToken() {
    return this.getItem(Storage.TOKEN);
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
  TOKEN = 'token',
}
