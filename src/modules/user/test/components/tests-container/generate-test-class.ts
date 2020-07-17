import { HttpService } from '@components/http.service';
import { LoaderService } from '@components/loader.service';
import { StorageService } from '@components/storage.serice';
import { Router } from '@angular/router';
import { NotificationService, ENotification } from '@components/notifications.service';
import { ITest } from '../../test.model';
import { Injectable } from '@angular/core';
import { DrawerService } from '@components/drawer-service';

@Injectable()
export abstract class GenerateTest {
    public test: ITest;
    constructor(
        protected drawerService: DrawerService,
        protected http: HttpService,
        private storage: StorageService,
        private loaderService: LoaderService,
        private router: Router,
        private notificationService: NotificationService,
    ) { }

    async generateTest(dataToPost?) {
        this.loaderService.show();
        try {
          this.test = await this.http.post('/tests', {userId: this.storage.getUserId(), ...dataToPost}).toPromise() as ITest;
          if (this.test) {
            this.notificationService.show(ENotification.SUCCESS, 'Created', 'Test created successfuly');
            this.router.navigate(['/user/attempt-test', this.test._id]);
          }
        } catch (e) {
            this.notificationService.show(ENotification.DANGER, 'Error', 'Error occurred during test creation');
        } finally {
          this.loaderService.hide();
        }
    }
}
