import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpService } from '@components/http.service';
import { LoaderService } from '@components/loader.service';
import { CQuestion } from '@modules/user/test/test.model';
import { DrawerService } from '@components/drawer-service';
import { NotificationService, ENotification, EError } from '@components/notifications.service';

@Component({
  selector: 'app-validate-math-expression',
  templateUrl: './validate-math-expression.component.html',
  styleUrls: ['./validate-math-expression.component.scss']
})
export class ValidateMathExpressionComponent implements OnInit {
  public content: string;
  public isValidate = false;
  public matchedQuestion: CQuestion;
  constructor(
    private loaderService: LoaderService,
    private http: HttpService,
    private drawerService: DrawerService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.drawerService.setPageHeader('Validate Expresssion');
  }

  onChange(changes: string) {
    // if (changes) {
    //   this.content = changes.split('\n').join(' ').trim();
    // } else {
    //   this.content = '';
    // }
    this.validate();
  }

  formatString() {
    this.content = this.content.split('\n').join(' ').replace(/\s\s+/g, ' ').trim();
    this.validate();
  }

  formatBreaksInString() {
    this.content = this.content.split('\n').join(' <br> ').trim();
    this.validate();
  }

  validate() {
    this.isValidate = false;
    setTimeout(() => {
      this.isValidate = true;
    }, 100);
  }

  async isQuestionExists() {
    this.matchedQuestion = null;
    try {
      await this.loaderService.show();
      this.matchedQuestion = await this.http.post('/questions/matching-question', {'question.statement': this.content})
        .toPromise() as CQuestion;
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

}
