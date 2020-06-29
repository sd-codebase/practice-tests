import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
    public opened = true;
    public pageHeader = '';
    open() {
        this.opened = true;
    }

    close() {
        this.opened = false;
    }

    setPageHeader(header: string) {
        this.pageHeader = header;
    }
}
