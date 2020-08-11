import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EQuestionStatus, ITest, CQuestion } from '../../test.model';

@Component({
  selector: 'app-question-pallete',
  templateUrl: './question-pallete.component.html',
  styleUrls: ['./question-pallete.component.scss']
})
export class QuestionPalleteComponent implements OnInit {
  @Input() test: ITest;
  @Input() action = 'attempt';
  @Output() handleQuestionSelection = new EventEmitter();

  public subjectButtons: string[] = [];
  public filteredQuestions: CQuestion[] = [];
  public activeSubject = '';

  constructor() { }

  ngOnInit() {
    const subjects = [...new Set(this.test.questions.map( que => que.chapter.subject))];
    if (subjects.length > 1) {
      this.subjectButtons = ['All', ...subjects];
    }
    this.filterQuestions('All');
  }

  filterQuestions(subject: string) {
    this.activeSubject = subject;
    if (subject === 'All') {
      this.filteredQuestions = this.test.questions;
    } else {
      this.filteredQuestions = this.test.questions.filter( que => que.chapter.subject === subject);
    }
  }

  getColor(question: CQuestion) {
    if (this.action === 'attempt') {
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
    } else if (this.action === 'view') {
      if (question.isCorrectAnswer === 0) {
        return 'warn';
      } else if (question.isCorrectAnswer === 1) {
        return 'success';
      } else if (question.isCorrectAnswer === 2) {
        return 'orange';
      } else {
        return '';
      }
    }
  }

  chooseQuestion(question: CQuestion) {
    if (this.action === 'attempt' && question.status === EQuestionStatus.NOTVISITED) {
      question.status = EQuestionStatus.UNANSWERED;
    }
    this.handleQuestionSelection.emit(question);
  }

}
