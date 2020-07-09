import { Component, OnInit } from '@angular/core';
import { HttpService } from '@components/http.service';
import { CChapter, CQuestion } from '@modules/user/test/test.model';
import * as _ from 'lodash';
import { LoaderService } from '@components/loader.service';
import { StorageService } from '@components/storage.serice';
import { DrawerService } from '@components/drawer-service';

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
  ) { }

  ngOnInit() {
    this.drawerService.setPageHeader('Import Solved Papers');
  }

  async onDataRead({names, jsonData}) {
    this.loaderService.show();
    const dataToPush = [];
    jsonData[names[0]].forEach( data => {
      const chapter = new CChapter(data);
      const options = [data.op1, data.op2, data.op3, data.op4];
      if (data.op5) {
        options.push(data.op5);
      }
      const isSingleAnswer = !data.answer.includes(',');
      const {level, tags} = data;
      dataToPush.push(new CQuestion({
        id: null, question: data.question, options, answer : data.answer,
        answerDescription: data.answer_description, isSingleAnswer, chapter,
        level, tags, imagePath: data.image_path,
      }));
    });
    this.uploadData = await this.http.post(this.urlToUpload,
      {testmeta: {name: names[0]}, questions: dataToPush, userId: this.storage.getUserId()}
    ).toPromise();
    this.loaderService.hide();
  }
}
