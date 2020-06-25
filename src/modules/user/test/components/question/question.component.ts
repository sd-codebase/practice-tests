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
  @Input() action = 'attempt';
  public hasOptions = true;
  constructor() { }

  ngOnInit() {
    this.hasOptions = this.question.options.some(op => op.statement);
  }

  onCheckboxChange(e) {
    const value = e.source.value.toString();
    const checkedAnswer = this.question.userAnswer && this.question.userAnswer.split(',') || [];

    if (e.checked && !checkedAnswer.includes(value)) {
      checkedAnswer.push(value);
    } else if (!e.checked && checkedAnswer.includes(value)) {
      checkedAnswer.splice(checkedAnswer.indexOf(value), 1);
    }
    this.question.userAnswer = checkedAnswer.join();
  }

  submitAnswer() {
    this.question.isCorrectAnswer();
  }

  isCheckedOption(opNum) {
    return this.question.userAnswer && this.question.userAnswer.length && this.question.userAnswer.includes(opNum);
  }

  onInputChange(userAnswer) {
    this.question.userAnswer = userAnswer;
  }

  getOption(num) {
    switch (num) {
      case 1:
        return 'a';
      case 2:
        return 'b';
      case 3:
        return 'c';
      case 4:
        return 'd';
      case 5:
        return 'e';
    }
  }

}
