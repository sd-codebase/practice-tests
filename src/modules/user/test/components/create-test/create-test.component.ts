import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ITest, ETestStatus, CQuestion, EQuestionStatus, IInstructions } from '../../test.model';
import { HttpService } from '@components/http.service';
import { CountdownComponent } from 'ngx-countdown';
import { QuizComponent } from '../quiz/quiz.component';
import { LoaderService } from '@components/loader.service';
import { NotificationService, ENotification, EError } from '@components/notifications.service';
import { StorageService } from '@components/storage.serice';
import { EUserRole } from 'src/auth/authentication/authentication.service';
import { filter } from 'lodash';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {
  @Input() testId: string;
  @ViewChild(CountdownComponent, {static: false})
  public counter: CountdownComponent;

  @ViewChild(QuizComponent, {static: false})
  public quizCompo: QuizComponent;

  public instructions: IInstructions[];
  public test: ITest;
  public timer = 0;
  public isTestLoaded = false;
  public openQuestionPallete = false;
  public startwithQuestion: number;
  public isGuest = false;
  public answerKeyPath = '/user/test-answer-key';
  public myTestsPath = '/user/my-tests';
  public onGoingTests = [];

  constructor(
    private http: HttpService,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.onGoingTests = Object.keys(this.storageService.getOngoingTest());
    this.isGuest = this.storageService.getUser().role !== EUserRole.USER;
    if (this.isGuest) {
      this.answerKeyPath = '/guest/test-answer-key';
      this.myTestsPath = '/guest/tests';
    }
    this.fetchTest();
  }

  async fetchTest() {
    this.isTestLoaded = false;
    try {
      await this.loaderService.show();
      const inProgressTest = this.storageService.getInProgressTest(this.testId);
      if (inProgressTest.test) {
        this.test = inProgressTest.test;
        this.getInstructions();
        this.timer = inProgressTest.timeLeft;
        this.isTestLoaded = true;
        this.startwithQuestion = inProgressTest.currentQuestion;
      } else {
        this.fetchTestFromServer();
      }
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  async fetchTestFromServer() {
    try {
      await this.loaderService.show();
      const url = '/tests/' + this.testId + (this.isGuest ? '?isGuest=' + true : '');
      this.test = await this.http.get(url).toPromise() as ITest;
      if (this.test.status !== ETestStatus.FINISHED) {
        this.getInstructions();
        this.test.questions = this.test.questions.map( (que, index) => {
          const question = new CQuestion(que as any);
          question.sortOrder = que.sortOrder;
          question.questionNum = que.sortOrder;
          question.status = EQuestionStatus.NOTVISITED;
          return question;
        });
        this.startwithQuestion = 1;
      }
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  getInstructions() {
    if (!this.test.instructions) {
      return {};
    }
    const instructions = this.test.instructions;
    this.instructions = Object.keys(instructions).map( key => {
      return {
        key,
        value: instructions[key].instruction,
        questions: instructions[key].questions,
      };
    });
  }

  async startTest() {
    if (!this.test.questions.length) {
      return;
    }
    await this.loaderService.show();
    this.test.status = ETestStatus.STARTED;
    setTimeout(() => {
      this.timer = this.test.allottedTime;
      this.isTestLoaded = true;
      this.loaderService.hide();
    }, 2000);
  }

  async onFinishTest() {
    try {
      const url = '/tests' + (this.isGuest ? '?isGuest=' + true : '');
      await this.loaderService.show();
      this.test.status = ETestStatus.FINISHED;
      this.test.attemptCount = this.test.questions.filter( que => que.isSubmitted).length;
      const test = this.test;
      this.test = null;
      this.test = await this.http.put(url, test).toPromise()  as ITest;
      this.storageService.removeTest(this.test._id);
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  pauseTimer() {
    if (this.counter) {
      this.counter.pause();
      this.saveTestProgress();
    }
  }

  resumeTimer() {
    if (this.counter) {
      this.counter.resume();
    }
  }

  saveTestProgress() {
    if (this.counter.left / 1000 > 0 && this.test.status === ETestStatus.STARTED) {
      this.storageService.saveTestProgress(this.test, this.counter.left / 1000, this.quizCompo.question.questionNum);
    }
  }

  finishTest() {
    if (this.counter) {
      this.counter.stop();
    }
  }

  handleEvent(e) {
    if (this.isTestLoaded && (e.action === 'stop' || e.action === 'done')) {
      this.test.completeTime = e.left ? e.left / 1000 : 0;
      this.onFinishTest();
    }
  }

  onQuestionSelection(question: CQuestion) {
    this.openQuestionPallete = false;
    this.quizCompo.setQuestion(question);
  }

}
