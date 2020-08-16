import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@components/loader.service';
import { NotificationService, ENotification, EError } from '@components/notifications.service';
import { HttpService } from '@components/http.service';
import { cloneDeep } from 'lodash';
import { ArrayObjectUtil } from '@core/array-object-util';
import { StorageService } from '@components/storage.serice';
import { ITest } from '@modules/user/test/test.model';
import { EUserRole } from 'src/auth/authentication/authentication.service';

@Component({
  selector: 'app-configure-mock-tests',
  templateUrl: './configure-mock-tests.component.html',
  styleUrls: ['./configure-mock-tests.component.scss']
})
export class ConfigureMockTestsComponent implements OnInit {
  public testConfig: IMockTestConfig;
  public testConfigSnapshot: IMockTestConfig;
  public testConfigList: IMockTestConfig[] = [];
  public testTypes = ETestConfigType;
  public questionTypes = EQuestionType;
  public courses: string[] = [];
  public course = '';
  public subjects = ['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology'];
  public viewMode = false;
  public role = EUserRole.ADMIN;
  public userRoles = EUserRole;
  public userId;

  constructor(
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private http: HttpService,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.courses = this.storageService.getMyCourses();
    this.course = this.storageService.getMyCourse();
    this.role = this.storageService.getUser().role;
    this.userId = this.storageService.getUserId();
    this.newTestConfig();
    this.fetchConfig();
  }

  async fetchConfig() {
    await this.loaderService.show();
    try {
      const testConfigList = await this.http.get(`/mock-tests`).toPromise() as IMockTestConfig[];
      this.testConfigList = testConfigList.filter( config => {
        if (config.course !== this.course) {
          return false;
        }
        if (this.role === EUserRole.ADMIN) {
          return config.createdBy === 'ADMIN';
        }
        return (config.createdBy === this.userId || config.createdBy === 'ADMIN') && !config.type;
      });
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

  async generateTest(config) {
    const url = '/tests/create-mock-test';
    const userId = this.storageService.getUserId();
    const testCriteria = {testConfigId: config._id };
    try {
      await this.loaderService.show();
      const test =
        await this.http.post(url, {userId, testCriteria}).toPromise() as ITest;
      if (test) {
        this.notificationService.show(ENotification.SUCCESS, 'Created', 'Test created successfuly, please go to Tests');
      }
    } catch (e) {
        this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  addSection() {
    this.testConfig.sections.push(this.newSection());
  }

  removeSection(section) {
    ArrayObjectUtil.removeObject(this.testConfig.sections, section);
  }

  addBlock(section) {
    section.blocks.push(this.newSectionBlock());
  }

  removeBlock(section, block) {
    ArrayObjectUtil.removeObject(section.blocks, block);
  }

  onNegativeMarkingChange() {
    if (!this.testConfig.isNegativeMarking) {
      this.testConfig.sections.forEach( section => {
        section.negativeMarksToEachQuestion = 0; section.isOptionwiseNegativeMarking = false;
      });
    } else {
      this.testConfig.sections.forEach( section => section.negativeMarksToEachQuestion = 1);
    }
  }

  onPassingStrategyChange() {
    if (this.testConfig.isSectionwisePassing) {
      this.testConfig.passingPercentage = 0;
      this.testConfig.sections.forEach( section => section.passingPercentage = 60);
    } else {
      this.testConfig.passingPercentage = 60;
      this.testConfig.sections.forEach( section => section.passingPercentage = 0);
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
      course: this.course,
      type: ETestConfigType.CUSTOM,
      noOfQuestions: 90,
      isNegativeMarking: false,
      isSectionwisePassing: false,
      passingPercentage: 60,
      totalMarks: null,
      createdBy: this.role === 1 ? 'ADMIN' : this.userId,
      sections: [
        this.newSection()
      ]
    };
  }

  newSection() {
    return {
      sectionName: '',
      marksToEachQuestion: 4,
      minutesToEachQuestion: 4,
      negativeMarksToEachQuestion: 0,
      isOptionwiseNegativeMarking: false,
      passingPercentage: 0,
      subject: '',
      instructions: '',
      blocks: [
        this.newSectionBlock()
      ],
    };
  }

  newSectionBlock() {
    return {
      questionNumberFrom: 1,
      questionNumberTo: 5,
      type: EQuestionType.ONE,
      chapters: ['All'],
      topics: ['All'],
    };
  }

}

export interface IMockTestConfig {
  _id?: string;
  paperName: string;
  type: ETestConfigType;
  course: string;
  noOfQuestions: number;
  isNegativeMarking: boolean;
  isSectionwisePassing: boolean;
  passingPercentage: number;
  sections: IMockTestSection[];
  totalMarks?: number;
  createdBy: string;
}

export interface IMockTestSection {
  sectionName: string;
  marksToEachQuestion: number;
  minutesToEachQuestion: number;
  isOptionwiseNegativeMarking: boolean;
  negativeMarksToEachQuestion: number;
  passingPercentage: number;
  subject: string;
  instructions: string;
  blocks: IMockTestSectionBlock[];
}

export interface IMockTestSectionBlock {
  questionNumberFrom: number;
  questionNumberTo: number;
  type: EQuestionType;
  chapters: string[];
  topics: string[];
}

export enum EQuestionType {
  NUMERIC, ONE, TWO, THREE, FOUR, PARAGRAPH
}

export enum ETestConfigType {
  CUSTOM, SUBJECT, CHAPTER, TOPIC
}
