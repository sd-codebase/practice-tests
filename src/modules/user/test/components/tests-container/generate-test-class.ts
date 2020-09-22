import { HttpService } from '@components/http.service';
import { LoaderService } from '@components/loader.service';
import { StorageService } from '@components/storage.serice';
import { Router } from '@angular/router';
import { NotificationService, ENotification, EError } from '@components/notifications.service';
import { ITest } from '../../test.model';
import { Injectable } from '@angular/core';
import { DrawerService } from '@components/drawer-service';
import { DialogBoxComponent } from '@components/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export abstract class GenerateTest {
    public test: ITest;
    constructor(
        protected drawerService: DrawerService,
        protected http: HttpService,
        protected storage: StorageService,
        protected loaderService: LoaderService,
        private router: Router,
        protected notificationService: NotificationService,
        private dialog: MatDialog,
    ) { }

    async generateTest(dataToPost?, isMockTest = false) {
      if (!this.storage.getUser().email_verified) {
        if (this.storage.getTestCount() >= 5) {
          this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, 'Please verify account to proceed');
          return;
        }
        this.storage.addTestCount();
      }
      const dialogRef = this.dialog.open(DialogBoxComponent, {
        data: {
          type: 'Confirm',
          message: `Do you want to generate test?`,
          button1: {text: 'Yes', value: true, color: 'primary'},
          button2: {text: 'No, not now', value: false},
        }
      });
      dialogRef.afterClosed().subscribe( val => {
        if (val) {
          this.proceedToGenerate(dataToPost, isMockTest);
        }
      });
    }

    async proceedToGenerate(dataToPost?, isMockTest = false) {
      const url = isMockTest ? '/tests/create-mock-test' : '/tests';
      try {
        await this.loaderService.show();
        this.test = await this.http.post(url, {userId: this.storage.getUserId(), testCriteria : dataToPost}).toPromise() as ITest;
        if (this.test) {
          this.notificationService.show(ENotification.SUCCESS, 'Created', 'Test created successfuly');
          this.router.navigate(['/user/attempt-test', this.test._id]);
        }
      } catch ({error: e}) {
          this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e && e.message);
      } finally {
        this.loaderService.hide();
      }
    }
}
