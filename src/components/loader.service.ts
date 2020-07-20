import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loader = new Subject<boolean>();

  constructor() { }

  show() {
    this.loader.next(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), 100);
    });
  }

  hide() {
    this.loader.next(false);
  }
}
