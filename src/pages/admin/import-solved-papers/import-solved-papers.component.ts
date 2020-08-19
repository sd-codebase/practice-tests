import { Component, OnInit } from '@angular/core';
import { HttpService } from '@components/http.service';
import { CChapter, CQuestion } from '@modules/user/test/test.model';
import { LoaderService } from '@components/loader.service';
import { StorageService } from '@components/storage.serice';
import { DrawerService } from '@components/drawer-service';
import { NotificationService, ENotification, EError } from '@components/notifications.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '@components/dialog-box/dialog-box.component';

@Component({
  selector: 'app-import-solved-papers',
  templateUrl: './import-solved-papers.component.html',
  styleUrls: ['./import-solved-papers.component.scss']
})
export class ImportSolvedPapersComponent implements OnInit {
  public urlToUpload = '/tests/create-predefined-test';
  public uploadData: any;

  constructor(
    private http: HttpService,
    private loaderService: LoaderService,
    private storage: StorageService,
    private drawerService: DrawerService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.drawerService.setPageHeader('Import Solved Papers');
  }

  async handleUploadData({names, jsonData, course}) {
    try {
      await this.loaderService.show();
      const dataToPush = [];
      jsonData[names[0]].forEach( data => {
        const chapter = new CChapter(data);
        const options = [data.op1 || '', data.op2 || '', data.op3 || '', data.op4 || ''];
        if (data.op5) {
          options.push(data.op5 || '');
        }
        options.forEach( op => {
          op = op && op.toString().trim() || '';
        });
        const isSingleAnswer = !data.answer.toString().includes(',');
        let {level, tags, question, answer_description} = data;
        level = level && level.toString().trim();
        tags = tags && tags.toString().trim();
        question = question && question.toString().trim();
        answer_description = answer_description && answer_description.toString().trim();
        dataToPush.push(new CQuestion({
          id: null, question, options, answer : data.answer,
          answerDescription: answer_description, isSingleAnswer, chapter,
          level, tags, imagePath: data.image_path, infoPara: data.info_para,
        }));
      });
      this.uploadData = await this.http.post(this.urlToUpload,
        {testmeta: {name: names[0]}, questions: dataToPush, userId: this.storage.getUserId(), course}
      ).toPromise();
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  async onDataRead({names, jsonData, course}) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        type: 'Confirm',
        message: `Do you want to upload ${names[0]}`,
        button1: {text: 'Yes', value: true, color: 'primary'},
        button2: {text: 'No, do not upload', value: false},
      }
    });
    dialogRef.afterClosed().subscribe( val => {
      if (val) {
        this.handleUploadData({names, jsonData, course});
      }
    });
  }
}
