import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DrawerService {
    public pageHeader = new Subject<string>();
    public opened = true;
    constructor() {}
    open() {
        this.opened = true;
    }

    close() {
        this.opened = false;
    }
    setPageHeader(header: string) {
        console.log(header);
        this.pageHeader.next(header);
    }
}
