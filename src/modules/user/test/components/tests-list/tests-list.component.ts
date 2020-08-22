import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '@components/http.service';
import { ITest } from '../../test.model';
import { StorageService } from '@components/storage.serice';
import { LoaderService } from '@components/loader.service';
import { ArrayObjectUtil } from '@core/array-object-util';
import { NotificationService, ENotification, EError } from '@components/notifications.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '@components/dialog-box/dialog-box.component';

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.scss']
})
export class TestsListComponent implements OnInit {
  @Input() isGuest = false;

  public attemptTestUrl = '/user/attempt-test';
  public testAnswerKeyUrl = '/user/test-answer-key';
  public tests: ITest[];
  public onGoingTests = [];

  constructor(
    private http: HttpService,
    private storage: StorageService,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) { }

  async ngOnInit() {
    this.onGoingTests = Object.keys(this.storage.getOngoingTest());
    this.makeUrls();
    try {
      await this.loaderService.show();
      let url = '';
      if (this.isGuest) {
        url = `/tests/all?isGuest=true&guestUserId=${this.storage.getUserId()}`;
      } else {
        url = `/tests/all?userId=${this.storage.getUserId()}`;
      }
      this.tests = await this.http.get(url).toPromise();
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  makeUrls() {
    if (this.isGuest) {
      this.attemptTestUrl = '/guest/attempt-test';
      this.testAnswerKeyUrl = '/guest/test-answer-key';
    }
  }

  onDeleteTest(test: ITest) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        type: 'Confirm',
        message: 'This action will delete this tests. Are you sure to delete this test?',
        button1: {text: 'Yes', value: true, color: 'primary'},
        button2: {text: 'No, Do not delete', value: false},
      }
    });
    dialogRef.afterClosed().subscribe( val => {
      if (val) {
        this.deleteTest(test);
      }
    });
  }

  async deleteTest(test: ITest) {
    try {
      await this.loaderService.show();
      await this.http.delete('/tests/' + test._id).toPromise();
      ArrayObjectUtil.removeObject(this.tests, test);
      this.storage.removeTest(test._id);
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

}
