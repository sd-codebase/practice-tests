import { Component, OnInit } from '@angular/core';
import { HttpService } from '@components/http.service';
import { CChapter, CQuestion, CStatement } from '@modules/user/test/test.model';
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
      const questionStatementKeys = ['isImage', 'hasImage', 'isImageFloated', 'isMathExpression', 'isSingleAnswer'];
      const optionStatementKeys = ['isImage', 'hasImage', 'isImageFloated', 'isMathExpression'];
      const question = new CStatement(
        data.question,
        data.containedImage,
        _.zipObject(questionStatementKeys, data[Keys.question].split(',').map( item => item === 'Yes' ? true : false)) as any
      );
      const op1 = new CStatement(
        data.op1,
        data.op1ContainedImage,
        _.zipObject(optionStatementKeys, data[Keys.op1].split(',').map( item => item === 'Yes' ? true : false)) as any
      );
      const op2 = new CStatement(
        data.op2,
        data.op2ContainedImage,
        _.zipObject(optionStatementKeys, data[Keys.op2].split(',').map( item => item === 'Yes' ? true : false)) as any
      );
      const op3 = new CStatement(
        data.op3,
        data.op3ContainedImage,
        _.zipObject(optionStatementKeys, data[Keys.op3].split(',').map( item => item === 'Yes' ? true : false)) as any
      );
      const op4 = new CStatement(
        data.op4,
        data.op4ContainedImage,
        _.zipObject(optionStatementKeys, data[Keys.op4].split(',').map( item => item === 'Yes' ? true : false)) as any
      );
      const op5 = data.op5 && new CStatement(
        data.op5,
        data.op5ContainedImage,
        _.zipObject(optionStatementKeys, data[Keys.op5].split(',').map( item => item === 'Yes' ? true : false)) as any
      );
      const options = [op1, op2, op3, op4];
      if (op5) {
        options.push(op5);
      }
      const answerDescription = new CStatement(
        data.answer_description,
        data.answerContainedImage,
        _.zipObject(optionStatementKeys, data[Keys.answer].split(',').map( item => item === 'Yes' ? true : false)) as any
      );
      const isSingleAnswer = data[Keys.question].split(',')[4] === 'Yes';
      const {level, tags} = data;
      dataToPush.push(new CQuestion({
        id: null, question, options, answer : data.answer,
        answerDescription, isSingleAnswer, chapter,
        level, tags, imagePath: data.image_path,
      }));
    });
    this.uploadData = await this.http.post(this.urlToUpload,
      {testmeta: {name: names[0]}, questions: dataToPush, userId: this.storage.getUserId()}
    ).toPromise();
    this.loaderService.hide();
  }
}

enum Keys {
  question = 'question_isImage_hasImage_isImageFloated_isMathExpression_isSingleAnswer',
  op1 = 'op1_isImage_hasImage_isImageFloated_isMathExpression',
  op2 = 'op2_isImage_hasImage_isImageFloated_isMathExpression',
  op3 = 'op3_isImage_hasImage_isImageFloated_isMathExpression',
  op4 = 'op4_isImage_hasImage_isImageFloated_isMathExpression',
  op5 = 'op5_isImage_hasImage_isImageFloated_isMathExpression',
  answer = 'answer_isImage_hasImage_isImageFloated_isMathExpression',
}
