import { Component, OnInit } from '@angular/core';
import { GenerateTest } from '@modules/user/test/components/tests-container/generate-test-class';
import { CTopic } from '@modules/user/test/test.model';
import { ENotification, EError } from '@components/notifications.service';
import { IMockTestConfig } from '@modules/admin/components/configure-mock-tests/configure-mock-tests.component';

@Component({
  selector: 'app-start-tests-container',
  templateUrl: './start-tests-container.component.html',
  styleUrls: ['./start-tests-container.component.scss']
})
export class StartTestsContainerComponent extends GenerateTest implements OnInit {
  public data: CTopic[];
  public mocktests: IMockTestConfig[];

  ngOnInit() {
    this.drawerService.setPageHeader('Take a test');
    this.fetchChapters();
    this.fetchMockTests();
  }

  async fetchChapters() {
    try {
      await this.loaderService.show();
      this.data = await this.http.get('/chapters/').toPromise();
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  async fetchMockTests() {
    try {
      await this.loaderService.show();
      const mockTests = await this.http.get('/mock-tests/course/' + this.storage.getMyCourse()).toPromise();
      this.mocktests = mockTests.filter( test => !test.type);
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  createTest(testConfigId) {
    this.generateTest({testConfigId});
  }

}
