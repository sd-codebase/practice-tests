import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ITest, ETestStatus, CQuestion, EQuestionStatus } from '../../test.model';
import { HttpService } from '@components/http.service';
import { CountdownComponent } from 'ngx-countdown';
import { QuizComponent } from '../quiz/quiz.component';
import { LoaderService } from '@components/loader.service';

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


  public test: ITest;
  public timer = 0;
  public isTestLoaded = false;
  constructor(
    private http: HttpService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.fetchTest();
  }

  async fetchTest() {
    this.loaderService.show();
    this.isTestLoaded = false;
    try {
      this.test = await this.http.get('/tests/' + this.testId).toPromise() as ITest;
      this.test.questions = this.test.questions.map( (que, index) => {
        const question = new CQuestion(que as any);
        question.questionNum = index + 1;
        question.status = EQuestionStatus.NOTVISITED;
        return question;
      });
    } catch (e) {

    } finally {
      this.loaderService.hide();
    }
  }

  startTest() {
    this.loaderService.show();
    this.test.status = ETestStatus.STARTED;
    setTimeout(() => {
      this.timer = this.test.allottedTime;
      this.isTestLoaded = true;
      this.loaderService.hide();
    }, 2000);
  }

  async onFinishTest() {
    this.loaderService.show();
    try {
      this.test.status = ETestStatus.FINISHED;
      this.test.attemptCount = this.test.questions.filter( que => que.isSubmitted).length;
      const test = this.test;
      this.test = null;
      this.test = await this.http.put('/tests', test).toPromise()  as ITest;
    } catch (e) {

    } finally {
      this.loaderService.hide();
    }
  }

  pauseTimer() {
    if (this.counter) {
      this.counter.pause();
    }
  }

  resumeTimer() {
    if (this.counter) {
      this.counter.resume();
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
    this.quizCompo.setQuestion(question);
  }

}
