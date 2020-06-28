import { Component, OnInit } from '@angular/core';
import { CQuestion } from '@modules/user/test/test.model';
import { LoaderService } from '@components/loader.service';
import { HttpService } from '@components/http.service';
import { StorageService } from '@components/storage.serice';
import { NotificationService, ENotification } from '@components/notifications.service';
import { ArrayObjectUtil } from '@core/array-object-util';

@Component({
  selector: 'app-verify-questions-container',
  templateUrl: './verify-questions-container.component.html',
  styleUrls: ['./verify-questions-container.component.scss']
})
export class VerifyQuestionsContainerComponent implements OnInit {
  public question: CQuestion;
  public questions: CQuestion[];
  constructor(
    private loaderService: LoaderService,
    private http: HttpService,
    private storage: StorageService,
    private notificationService: NotificationService,
  ) { }

  async ngOnInit() {
    this.loaderService.show();
    try {
      this.questions = await this.http.get('/questions?verifiedBy=' + this.storage.getUserId() + '&isVerified=' + false)
        .toPromise() as CQuestion[];
    } catch (e) {

    } finally {
      this.loaderService.hide();
    }
  }

  setQuestion(question) {
    this.question = null;
    setTimeout(() => {
      this.question = question;
    }, 1000);
  }

  async verifyQuestion() {
    this.loaderService.show();
    try {
      await this.http.post('/questions/verify', {questionId: this.question.id}) .toPromise();
      this.notificationService.show(ENotification.SUCCESS, 'Verified', 'Verified successfully');
      ArrayObjectUtil.removeObject(this.questions, this.question);
      this.question = null;
    } catch (e) {

    } finally {
      this.loaderService.hide();
    }
  }

}
