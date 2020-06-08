import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ITest, ETestStatus, CQuestion } from '../../test.model';
import { HttpService } from '@components/http.service';
import { CountdownComponent } from 'ngx-countdown';
import { QuizComponent } from '../quiz/quiz.component';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {
  @ViewChild(CountdownComponent, {static: false})
  public counter: CountdownComponent;

  @ViewChild(QuizComponent, {static: false})
  public quizCompo: QuizComponent;


  public test: ITest;
  public timer = 0;
  constructor(
    private http: HttpService,
  ) { }

  ngOnInit() {
  }

  async createTest() {
    this.test = await this.http.post('/tests').toPromise() as ITest;
    this.test.questions = this.test.questions.map( (que, index) => {
      const question = new CQuestion(que as any);
      question.questionNum = index + 1;
      return question;
    });
  }

  startTest() {
    this.test.status = ETestStatus.STARTED;
    setTimeout(() => {
      this.timer = this.test.allottedTime;
    }, 2000);
  }

  async onFinishTest() {
    if (this.counter) {
      this.counter.stop();
    }
    this.test.status = ETestStatus.FINISHED;
    this.test.attemptCount = this.test.questions.filter( que => que.isSubmitted).length;
    this.test.correctCount = this.test.questions.filter( que => que.correctAnswer).length;
    this.test.percentage = +(this.test.correctCount / this.test.questionCount * 100).toFixed(2);
    this.test = await this.http.put('/tests', this.test).toPromise()  as ITest;
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

  handleEvent(e) {
    if (e.action === 'stop') {
      this.test.completeTime = e.left / 1000;
    }
  }

  onQuestionSelection(question: CQuestion) {
    this.quizCompo.setQuestion(question);
  }

}
