import { Component, OnInit } from '@angular/core';
import { CQuestion } from '@modules/user/test/test.model';
import { LoaderService } from '@components/loader.service';
import { HttpService } from '@components/http.service';
import { StorageService } from '@components/storage.serice';
import { NotificationService, ENotification, EError } from '@components/notifications.service';
import { ArrayObjectUtil } from '@core/array-object-util';

@Component({
  selector: 'app-verify-questions-container',
  templateUrl: './verify-questions-container.component.html',
  styleUrls: ['./verify-questions-container.component.scss']
})
export class VerifyQuestionsContainerComponent implements OnInit {
  public questionEdited: CQuestion;
  public question: CQuestion;
  public questions: CQuestion[];
  constructor(
    private loaderService: LoaderService,
    private http: HttpService,
    private storage: StorageService,
    private notificationService: NotificationService,
  ) { }

  async ngOnInit() {
    try {
      await this.loaderService.show();
      this.questions = await this.http.get('/questions?verifiedBy=' + this.storage.getUserId() + '&isVerified=' + false)
        .toPromise() as CQuestion[];
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  async setQuestion(question) {
    await this.loaderService.show();
    this.question = null;
    setTimeout(() => {
      this.questionEdited = question;
      this.question = question;
    }, 1000);
    setTimeout(() => {
      this.loaderService.hide();
    }, 3000);
  }

  async verifyQuestion() {
    await this.loaderService.show();
    try {
      await this.http.post('/questions/verify', {questionId: this.question.id}) .toPromise();
      this.notificationService.show(ENotification.SUCCESS, 'Verified', 'Verified successfully');
      ArrayObjectUtil.removeObject(this.questions, this.question);
      this.question = null;
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  async updateAndVerifyQuestion() {
    await this.loaderService.show();
    try {
      await this.http.post('/questions/verify-update', this.questionEdited) .toPromise();
      this.notificationService.show(ENotification.SUCCESS, 'Verified', 'Update & Verified successfully');
      ArrayObjectUtil.removeObject(this.questions, this.questionEdited);
      this.question = null;
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  transpileQuestion() {
    this.question = null;
    setTimeout(() => {
      this.question = this.questionEdited;
    }, 100);
  }

}
