import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
    public opened = true;
    open() {
        this.opened = true;
    }

    close() {
        this.opened = false;
    }
}
