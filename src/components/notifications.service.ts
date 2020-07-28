import { Injectable, Component, Inject } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
    constructor(
        private snackBar: MatSnackBar,
    ) {}

    show(status: ENotification, title: string | EError, message: string) {
        const icon =  status === ENotification.SUCCESS && 'verified_user'
        || status === ENotification.WARNING && 'notification_important'
        || status === ENotification.DANGER && 'cancel';
        const snackbarclass =  status === ENotification.SUCCESS && 'success'
        || status === ENotification.WARNING && 'warning'
        || status === ENotification.DANGER && 'danger';
        this.snackBar.openFromComponent(NotificationBarComponent, {
            data: {icon, title, message},
            panelClass: [snackbarclass, 'snackbar'],
            duration: status === ENotification.DANGER ? 10000 : 4000,
            horizontalPosition: window.innerWidth <= 600 ? 'center' : 'left',
            verticalPosition: window.innerWidth <= 600 ? 'top' : 'bottom',
        });
    }
}

export enum ENotification {
    SUCCESS, WARNING, DANGER
}

export enum EError {
    HANDLED = 'Error',
    UNHANDLED = 'Unhandled Error',
}



@Component({
    selector: 'app-snack-bar-component',
    template: `
    <div fxLayout="row" fxLayoutAlign="space-between center" fxLayoutGap="0.5em">
        <mat-icon>{{data.icon}}</mat-icon>
        <div fxFlex="90" fxLayout="column" fxLayoutAlign="space-between start" fxLayoutGap="0.5em">
            <h4>{{data.title}}</h4>
            <p>{{data.message}}</p>
        </div>
    </div>
    `,
    styles: ['h4, p { margin:0; }']
})
export class NotificationBarComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
