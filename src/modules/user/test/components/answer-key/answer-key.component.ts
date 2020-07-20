import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpService } from '@components/http.service';
import { LoaderService } from '@components/loader.service';
import { ITest, CQuestion } from '../../test.model';
import { QuizComponent } from '../quiz/quiz.component';
import { DrawerService } from '@components/drawer-service';
import { NotificationService, ENotification, EError } from '@components/notifications.service';

@Component({
  selector: 'app-answer-key',
  templateUrl: './answer-key.component.html',
  styleUrls: ['./answer-key.component.scss']
})
export class AnswerKeyComponent implements OnInit {
  @ViewChild(QuizComponent, {static: false})
  public quizCompo: QuizComponent;

  @Input() testId: string;
  public test: ITest;
  public openQuestionPallete = false;
  constructor(
    private http: HttpService,
    private loaderService: LoaderService,
    private drawerService: DrawerService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.fetchTest();
  }

  async fetchTest() {
    if (this.testId) {
      try {
        await this.loaderService.show();
        this.test = await this.http.get('/tests/' + this.testId).toPromise();
        this.test.questions = this.test.questions.map( (que, index) => {
          const question = new CQuestion(que as any);
          question.questionNum = index + 1;
          return question;
        });
        this.drawerService.setPageHeader(this.test.testName);
      } catch (e) {
        this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
      } finally {
        this.loaderService.hide();
      }
    }
  }

  onQuestionSelection(question: CQuestion) {
    this.quizCompo.setQuestionToView(question);
  }

}
