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
  }

  hide() {
    this.loader.next(false);
  }
}
