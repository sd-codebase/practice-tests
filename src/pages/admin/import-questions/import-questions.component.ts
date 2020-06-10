import { Component, OnInit } from '@angular/core';
import { HttpService } from '@components/http.service';
import { CChapter, CQuestion, CStatement } from '@modules/user/test/test.model';
import * as _ from 'lodash';

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
  ) { }

  ngOnInit() {
  }

  async onDataRead({names, jsonData}) {
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
        data.containedImage,
        _.zipObject(optionStatementKeys, data[Keys.op1].split(',').map( item => item === 'Yes' ? true : false)) as any
      );
      const op2 = new CStatement(
        data.op2,
        data.containedImage,
        _.zipObject(optionStatementKeys, data[Keys.op2].split(',').map( item => item === 'Yes' ? true : false)) as any
      );
      const op3 = new CStatement(
        data.op3,
        data.containedImage,
        _.zipObject(optionStatementKeys, data[Keys.op3].split(',').map( item => item === 'Yes' ? true : false)) as any
      );
      const op4 = new CStatement(
        data.op4,
        data.containedImage,
        _.zipObject(optionStatementKeys, data[Keys.op4].split(',').map( item => item === 'Yes' ? true : false)) as any
      );
      const op5 = data.op5 && new CStatement(
        data.op5,
        data.containedImage,
        _.zipObject(optionStatementKeys, data[Keys.op5].split(',').map( item => item === 'Yes' ? true : false)) as any
      );
      const options = [op1, op2, op3, op4];
      if (op5) {
        options.push(op5);
      }
      const isSingleAnswer = data[Keys.question].split(',')[4] === 'Yes';
      dataToPush.push(new CQuestion({_id: null, question, options, answer : data.answer, isSingleAnswer, chapter}));
    });
    // console.log(dataToPush);
    this.uploadData = await this.http.post(this.urlToUpload, dataToPush).toPromise();
  }
}

enum Keys {
  question = 'question_isImage_hasImage_isImageFloated_isMathExpression_isSingleAnswer',
  op1 = 'op1_isImage_hasImage_isImageFloated_isMathExpression',
  op2 = 'op2_isImage_hasImage_isImageFloated_isMathExpression',
  op3 = 'op3_isImage_hasImage_isImageFloated_isMathExpression',
  op4 = 'op4_isImage_hasImage_isImageFloated_isMathExpression',
  op5 = 'op5_isImage_hasImage_isImageFloated_isMathExpression',
}
