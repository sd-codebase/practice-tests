import { Component, OnInit, Input } from '@angular/core';
import { CQuestion } from '../../test.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: CQuestion;
  @Input() counter: number;
  constructor() { }

  ngOnInit() {
    this.question.isCorrectAnswer = this.question.isCorrectAnswer.bind(this.question);
  }

  onCheckboxChange(e) {
    const value = Number(e.source.value);
    const checkedAnswer = this.question.userAnswer || [];

    if (e.checked && !checkedAnswer.includes(value)) {
      checkedAnswer.push(value);
    } else if (!e.checked && checkedAnswer.includes(value)) {
      checkedAnswer.splice(checkedAnswer.indexOf(value), 1);
    }
    this.question.userAnswer = checkedAnswer;
  }

  submitAnswer() {
    this.question.isCorrectAnswer();
  }

  isCheckedOption(opNum) {
    return this.question.userAnswer && this.question.userAnswer.length && this.question.userAnswer.includes(opNum);
  }

}
