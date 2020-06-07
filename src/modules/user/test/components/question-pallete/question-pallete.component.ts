import { Component, OnInit } from '@angular/core';
import { EQuestionStatus } from '../../test.model';

@Component({
  selector: 'app-question-pallete',
  templateUrl: './question-pallete.component.html',
  styleUrls: ['./question-pallete.component.scss']
})
export class QuestionPalleteComponent implements OnInit {
  questions = [];
  constructor() { }

  ngOnInit() {
    for (let i = 1; i <= 20; i++) {
      const que = {num: i, status: EQuestionStatus.UNANSWERED};
      this.questions.push(que);
    }
    for (let i = 21; i <= 40; i++) {
      const que = {num: i, status: EQuestionStatus.ANSWERED};
      this.questions.push(que);
    }
    for (let i = 41; i <= 60; i++) {
      const que = {num: i, status: EQuestionStatus.MARKED};
      this.questions.push(que);
    }
    for (let i = 61; i <= 80; i++) {
      const que = {num: i, status: EQuestionStatus.MARKEDANSWERD};
      this.questions.push(que);
    }
  }

  getColor(ob) {
    if (ob.status === EQuestionStatus.UNANSWERED) {
      return 'lime';
    } else if (ob.status === EQuestionStatus.MARKED) {
      return 'warn';
    } else if (ob.status === EQuestionStatus.ANSWERED) {
      return 'chartreuse';
    } else if (ob.status === EQuestionStatus.MARKEDANSWERD) {
      return 'primary';
    }
  }

  changeStatus(ob){
    ob.status = EQuestionStatus.ANSWERED;
  }

}
