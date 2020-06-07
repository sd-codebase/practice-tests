import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ITest, CQuestion } from '../../test.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  @Input() test: ITest;
  @Output() timerPause = new EventEmitter();
  @Output() timerResume = new EventEmitter();
  public counter: number;
  public question: CQuestion;

  constructor() { }

  ngOnInit() {
    this.firstQuestion();
  }

  pauseTimer() {
    this.timerPause.emit();
  }

  resumeTimer() {
    setTimeout(() => {
      this.timerResume.emit();
    }, 2000);
  }

  nextQuestion() {
    this.pauseTimer();
    this.question = null;
    setTimeout(() => {
      this.question = this.test.questions[++this.counter];
    }, 1);
    this.resumeTimer();
  }

  firstQuestion() {
    this.pauseTimer();
    this.question = null;
    setTimeout(() => {
      this.question = this.test.questions[0];
    }, 1);
    this.counter = 0;
    this.resumeTimer();
  }

  prevQuestion() {
    this.pauseTimer();
    this.question = null;
    setTimeout(() => {
      this.question = this.test.questions[--this.counter];
    }, 1);
    this.resumeTimer();
  }

  lastQuestion() {
    this.pauseTimer();
    this.question = null;
    setTimeout(() => {
      this.question = this.test.questions[this.test.questions.length - 1];
    }, 1);
    this.counter = this.test.questions.length - 1;
    this.resumeTimer();
  }

  ngOnDestroy() {
    this.question = null;
  }
}
