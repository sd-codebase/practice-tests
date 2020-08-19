import { Component, OnInit } from '@angular/core';
import { HttpService } from '@components/http.service';
import { LoaderService } from '@components/loader.service';
import { NotificationService, ENotification, EError } from '@components/notifications.service';
import { StorageService } from '@components/storage.serice';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from 'src/auth/authentication/authentication.service';
import { IGroup } from '../users-list/users-list.component';
import { ITest } from '@modules/user/test/test.model';
import { MapUsersComponent } from './map-users/map-users.component';
import { isEqual } from 'lodash';
import { ArrayObjectUtil } from '@core/array-object-util';
import { DialogBoxComponent } from '@components/dialog-box/dialog-box.component';

@Component({
  selector: 'app-set-tests',
  templateUrl: './set-tests.component.html',
  styleUrls: ['./set-tests.component.scss']
})
export class SetTestsComponent implements OnInit {
  public users: IUser[];
  public groups: IGroup[];
  public tests: ITest[];
  public course: string;

  constructor(
    private http: HttpService,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private storageService: StorageService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.course = this.storageService.getMyCourse();
    this.fetchTests();
    this.fetchUsers();
    this.fetchUserGroups();
  }

  async fetchTests() {
    try {
      await this.loaderService.show();
      const tests = await this.http.get('/tests/all?userId=' + this.storageService.getUserId()).toPromise() as ITest[];
      this.tests = tests.filter( t => t.course === this.course);
      // this.tests.sort((a, b) => a.createdAt > b.createdAt);
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  async fetchUsers() {
    await this.loaderService.show();
    try {
      this.users = await this.http.get(`/users/fetch-guests/${this.storageService.getUserId()}`).toPromise() as IUser[];
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  async fetchUserGroups() {
    await this.loaderService.show();
    try {
      this.groups = await this.http.get(`/users/user-groups/${this.storageService.getUserId()}`).toPromise() as IGroup[];
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  async updateUsersToTest(test) {
    await this.loaderService.show();
    try {
      await this.http.put(`/tests/update-users`, test).toPromise();
      this.notificationService.show(ENotification.SUCCESS, 'Candidates updated', `Candidated updated for ${test.testName}`);
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  async onDeleteTest(test) {
    await this.loaderService.show();
    try {
      await this.http.delete(`/tests/${test._id}`).toPromise();
      ArrayObjectUtil.removeObject(this.tests, test);
      this.notificationService.show(ENotification.SUCCESS, 'Test Deleted', `${test.testName} deleted`);
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  async deleteTest(test) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        type: 'Confirm',
        message: 'This action will delete this tests, and asociated candidates test. Are you sure to delete this test?',
        button1: {text: 'Yes', value: true, color: 'primary'},
        button2: {text: 'No, stay for a while', value: false},
      }
    });
    dialogRef.afterClosed().subscribe( val => {
      if (val) {
        this.onDeleteTest(test);
      }
    });
  }

  groupChange(group: IGroup, test: ITest) {
    if (!isEqual(test.users, group.users)) {
      test.users = group.users;
      this.updateUsersToTest(test);
    }
  }

  openUserDialog(test: ITest) {
    const dialogRef = this.dialog.open(MapUsersComponent, {
      data: {
        test,
        users: this.users, // .filter( user => user.enabled),
        groups: this.groups,
      }
    });

    dialogRef.afterClosed().subscribe((result: IUser[]) => {
      if (!isEqual(test.users, result)) {
        test.users = result.map( user => user._id);
        this.updateUsersToTest(test);
      }
    });
  }

}
