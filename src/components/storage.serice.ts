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

  saveTestProgress(test, timeLeft, currentQuestion) {
    test.timeLeft = timeLeft;
    test.currentQuestion = currentQuestion;
    this.setItem(test._id, test);
  }

  getInProgressTest(testId) {
    let test = this.getItem(testId);
    if (!test) {
      test = null;
    } else if (this.getUserId() !== test.userId) {
      test = null;
    }
    return { test, timeLeft: test && test.timeLeft, currentQuestion: test && test.currentQuestion };
  }

  removeTest(testId) {
    this.removeItem(testId);
  }

  clear() {
    localStorage.clear();
  }

  private removeItem(key) {
    localStorage.removeItem(key);
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
