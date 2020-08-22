import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class StorageService {
  constructor() { }

  getExpiryTime() {
    return this.getItem(Storage.EXPIRY);
  }

  getEndpoints() {
    return this.getItem(Storage.ENDPOINTS);
  }

  setEndpoints(endpoints) {
    this.setItem(Storage.ENDPOINTS, endpoints);
  }

  getMyCourse() {
    return this.getItem(Storage.MYCOURSE);
  }

  setMyCourse(course) {
    this.setItem(Storage.MYCOURSE, course);
  }

  getMyCourses() {
    return this.getItem(Storage.MYCOURSES);
  }

  setMyCourses(courses) {
    this.setItem(Storage.MYCOURSES, courses);
  }

  getUserId() {
      return this.getUser()._id;
  }

  getUser() {
    return this.getItem(Storage.USER);
  }

  setUser(user) {
    const expiry = moment().add(30, 'days');
    this.setItem(Storage.EXPIRY, expiry);
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
    this.setOngoingTest(test._id);
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
    this.removeOngoingTest(testId);
  }

  setOngoingTest(testId) {
    const testsinprogress = this.getOngoingTest();
    testsinprogress[testId] = true;
    this.setItem(Storage.TESTSINPROGRESS, testsinprogress);
  }

  removeOngoingTest(testId) {
    const testsinprogress = this.getOngoingTest();
    delete testsinprogress[testId];
    this.setItem(Storage.TESTSINPROGRESS, testsinprogress);
  }

  getOngoingTest() {
    return this.getItem(Storage.TESTSINPROGRESS) || {};
  }

  clear() {
    this.removeItem(Storage.TOKEN);
    this.removeItem(Storage.USER);
    this.removeItem(Storage.ENDPOINTS);
    this.removeItem(Storage.MYCOURSE);
  }

  clearStorage() {
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
  TESTSINPROGRESS = 'testsinprogress',
  EXPIRY = 'expiry',
  USER = 'user',
  TOKEN = 'token',
  MYCOURSES = 'mycourses',
  MYCOURSE = 'mycourse',
  ENDPOINTS = 'endpoints',
}
