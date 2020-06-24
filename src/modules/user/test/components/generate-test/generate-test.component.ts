import { Component, OnInit } from '@angular/core';
import { HttpService } from '@components/http.service';
import { LoaderService } from '@components/loader.service';
import { StorageService } from '@components/storage.serice';
import { ITest } from '../../test.model';
import { Router } from '@angular/router';
import { NotificationService, ENotification } from '@components/notifications.service';
import { GenerateTest } from '../tests-container/generate-test-class';

@Component({
  selector: 'app-generate-test',
  templateUrl: './generate-test.component.html',
  styleUrls: ['./generate-test.component.scss']
})
export class GenerateTestComponent extends GenerateTest {
  createTest() {
    this.generateTest();
  }
}
