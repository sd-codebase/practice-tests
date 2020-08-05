import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@components/loader.service';
import { NotificationService, ENotification, EError } from '@components/notifications.service';
import { HttpService } from '@components/http.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-configure-mock-tests',
  templateUrl: './configure-mock-tests.component.html',
  styleUrls: ['./configure-mock-tests.component.scss']
})
export class ConfigureMockTestsComponent implements OnInit {
  public testConfig: IMockTestConfig;
  public testConfigSnapshot: IMockTestConfig;
  public testConfigList: IMockTestConfig[] = [];
  public questionTypes = EQuestionType;
  public courses = ['JEE', 'NEET', 'JEE Adv I', 'JEE Adv. II'];
  public subjects = ['Physics', 'Chemistry', 'Maths', 'Biology'];
  public viewMode = false;

  constructor(
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private http: HttpService,
  ) { }

  ngOnInit() {
    this.newTestConfig();
    this.fetchConfig();
  }

  async fetchConfig() {
    await this.loaderService.show();
    try {
      this.testConfigList = await this.http.get(`/mock-tests`, this.testConfig).toPromise() as IMockTestConfig[];
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  async saveConfig(update: boolean) {
    await this.loaderService.show();
    try {
      let testConfig;
      if (update) {
        testConfig = await this.http.put(`/mock-tests/${this.testConfig._id}`, this.testConfig).toPromise() as IMockTestConfig;
      } else {
        testConfig = await this.http.post(`/mock-tests`, this.testConfig).toPromise() as IMockTestConfig;
        this.testConfigList.unshift(testConfig);
      }
      this.newTestConfig();
      this.notificationService.show(ENotification.SUCCESS, 'Config created/updated', 'New test config created/updated');
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  addSection() {
    this.testConfig.sections.push(this.newSection());
  }

  onNegativeMarkingChange() {
    if (!this.testConfig.isNegativeMarking) {
      this.testConfig.negativeMarksToEachQuestion = 0;
      this.testConfig.isOptionwiseNegativeMarking = false;
    }
  }

  selectTestConfigForUpdate(config: IMockTestConfig) {
    this.viewMode = false;
    this.testConfigSnapshot = cloneDeep(config);
    this.testConfig = config;
  }

  selectTestConfigForView(config: IMockTestConfig) {
    this.viewMode = true;
    this.testConfig = config;
  }

  discardTestConfig() {
    this.testConfig = this.testConfigSnapshot;
  }

  discardViewMode() {
    this.viewMode = false;
    this.newTestConfig();
  }

  newTestConfig() {
    this.testConfig = {
      paperName: '',
      course: '',
      noOfQuestions: 90,
      marksToEachQuestion: 4,
      isNegativeMarking: false,
      negativeMarksToEachQuestion: 0,
      passingPercentage: 60,
      isOptionwiseNegativeMarking: false,
      sections: [
        this.newSection()
      ]
    };
  }

  newSection() {
    return {
      sectionName: '',
      questionNumberFrom: 1,
      questionNumberTo: 5,
      type: EQuestionType.INTEGER,
      subject: '',
      chapters: ['All'],
      topic: ['All'],
      instructions: '',
    };
  }

}

export interface IMockTestConfig {
  _id?: string;
  paperName: string;
  course: string;
  noOfQuestions: number;
  marksToEachQuestion: number;
  isNegativeMarking: boolean;
  negativeMarksToEachQuestion: number;
  passingPercentage: number;
  isOptionwiseNegativeMarking: boolean;
  sections: IMockTestSection[];
}

export interface IMockTestSection {
  sectionName: string;
  questionNumberFrom: number;
  questionNumberTo: number;
  type: EQuestionType;
  subject: string;
  chapters: string[];
  topic: string[];
  instructions: string;
}

export enum EQuestionType {
  INTEGER, ONE, TWO, THREE, FOUR
}
