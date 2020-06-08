import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EQuestionStatus, ITest, CQuestion } from '../../test.model';

@Component({
  selector: 'app-question-pallete',
  templateUrl: './question-pallete.component.html',
  styleUrls: ['./question-pallete.component.scss']
})
export class QuestionPalleteComponent implements OnInit {
  @Input() test: ITest;
  @Output() handleQuestionSelection = new EventEmitter();
  constructor() { }

  ngOnInit() {

  }

  getColor(question: CQuestion) {
    if (question.status === EQuestionStatus.NOTVISITED) {
      return '';
    } else if (question.status === EQuestionStatus.UNANSWERED) {
      return 'warn';
    } else if (question.status === EQuestionStatus.MARKED) {
      return 'primary';
    } else if (question.status === EQuestionStatus.ANSWERED) {
      return 'lime';
    } else if (question.status === EQuestionStatus.MARKEDANSWERD) {
      return 'accent';
    }
  }

  chooseQuestion(question: CQuestion) {
    if ( question.status === EQuestionStatus.NOTVISITED) {
      question.status = EQuestionStatus.UNANSWERED;
    }
    this.handleQuestionSelection.emit(question);
  }

}
