import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ITest, CQuestion, EQuestionStatus } from '../../test.model';
import { LoaderService } from '@components/loader.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  @Input() test: ITest;
  @Output() timerPause = new EventEmitter();
  @Output() timerResume = new EventEmitter();
  @Output() handleFinishTest = new EventEmitter();
  public counter: number;
  public question: CQuestion;

  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.firstQuestion();
  }

  pauseTimer() {
    this.loaderService.show();
    this.timerPause.emit();
  }

  resumeTimer() {
    setTimeout(() => {
      this.timerResume.emit();
      this.loaderService.hide();
    }, 2000);
  }

  setQuestion( question: CQuestion) {
    if (this.question === question) {
      return;
    }
    this.pauseTimer();
    this.question = null;
    setTimeout(() => {
      this.question = question;
    }, 1);
    this.resumeTimer();
  }

  nextQuestion() {
    if (this.test.questionCount === this.question.questionNum) {
      return;
    }
    this.pauseTimer();
    const questionNum = this.question.questionNum;
    this.question = null;
    setTimeout(() => {
      this.question = this.test.questions.find( que => que.questionNum === (questionNum + 1));
      this.updateQuestionStatus();
    }, 1);
    this.resumeTimer();
  }

  firstQuestion() {
    this.pauseTimer();
    this.question = null;
    setTimeout(() => {
      this.question = this.test.questions[0];
      this.updateQuestionStatus();
    }, 1);
    this.counter = 0;
    this.resumeTimer();
  }

  prevQuestion() {
    this.pauseTimer();
    const questionNum = this.question.questionNum;
    this.question = null;
    setTimeout(() => {
      this.question = this.test.questions.find( que => que.questionNum === (questionNum - 1));
      this.updateQuestionStatus();
    }, 1);
    this.resumeTimer();
  }

  isValidAnswerSelected() {
    return (this.question.isSingleAnswer && !this.question.userAnswer)
    || (!this.question.isSingleAnswer && !this.question.userAnswer.length);
  }

  saveAndNext() {
    if (this.isValidAnswerSelected()) {
      return;
    }
    this.question.isSubmitted = true;
    this.question.status = EQuestionStatus.ANSWERED;
    this.nextQuestion();
  }

  saveAndMarkForReviewAndNext() {
    if (this.isValidAnswerSelected()) {
      return;
    }
    this.question.isSubmitted = true;
    this.question.status = EQuestionStatus.MARKEDANSWERD;
    this.nextQuestion();
  }

  markForReviewAndNext() {
    this.question.status = EQuestionStatus.MARKED;
    this.nextQuestion();
  }

  clearResponse() {
    this.question.isSubmitted = false;
    this.question.userAnswer = [];
  }

  isLastQuestion() {
    return this.question.questionNum === this.test.questionCount;
  }

  updateQuestionStatus() {
    if ( this.question.status === EQuestionStatus.NOTVISITED) {
      this.question.status = EQuestionStatus.UNANSWERED;
    }
  }

  finishTest() {
    this.handleFinishTest.emit();
  }

  ngOnDestroy() {
    this.question = null;
  }
}
