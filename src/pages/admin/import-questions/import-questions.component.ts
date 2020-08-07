import { Component, OnInit } from '@angular/core';
import { HttpService } from '@components/http.service';
import { CChapter, CQuestion } from '@modules/user/test/test.model';
import { LoaderService } from '@components/loader.service';
import { StorageService } from '@components/storage.serice';
import { DrawerService } from '@components/drawer-service';
import { NotificationService, ENotification, EError } from '@components/notifications.service';

@Component({
  selector: 'app-import-questions',
  templateUrl: './import-questions.component.html',
  styleUrls: ['./import-questions.component.scss']
})
export class ImportQuestionsComponent implements OnInit {
  public urlToUpload = '/questions/import';
  public uploadData: any;
  constructor(
    private http: HttpService,
    private loaderService: LoaderService,
    private storage: StorageService,
    private drawerService: DrawerService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.drawerService.setPageHeader('Import question');
  }

  async onDataRead({names, jsonData}) {
    const proceed = confirm(`Do you want to upload ${names[0]}`);
    if (!proceed) {
      return;
    }
    try {
      await this.loaderService.show();
      const dataToPush = [];
      jsonData[names[0]].forEach( data => {
        const chapter = new CChapter(data);
        const options = [data.op1, data.op2, data.op3, data.op4];
        if (data.op5) {
          options.push(data.op5);
        }
        options.forEach( op => {
          op = op && op.trim() || '';
        });
        const isSingleAnswer = !data.answer.toString().includes(',');
        let {level, tags, question, answer_description} = data;
        level = level && level.trim();
        tags = tags && tags.trim();
        question = question && question.trim();
        answer_description = answer_description && answer_description.trim();
        dataToPush.push(new CQuestion({
          id: null, question, options, answer : data.answer,
          answerDescription: answer_description, isSingleAnswer, chapter,
          level, tags, imagePath: data.image_path, infoPara: data.info_para,
        }));
      });
      this.uploadData = await this.http.post(this.urlToUpload, {questions: dataToPush, userId: this.storage.getUserId()}).toPromise();
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }
}
