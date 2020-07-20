import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ITest, CQuestion, EQuestionStatus, CStatement, IInstructions } from '../../test.model';
import { LoaderService } from '@components/loader.service';
import { HttpService } from '@components/http.service';
import { NotificationService, ENotification, EError } from '@components/notifications.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  @Input() test: ITest;
  @Input() action: string;
  @Output() timerPause = new EventEmitter();
  @Output() timerResume = new EventEmitter();
  @Output() handleFinishTest = new EventEmitter();

  public instructions: IInstructions[];
  public counter: number;
  public question: CQuestion;
  public isAnswerVisible = false;
  public answerDescription: CStatement;
  public answer: string;

  constructor(
    private loaderService: LoaderService,
    private http: HttpService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    if (this.action === 'attempt') {
      this.firstQuestion();
    } else if (this.action === 'view') {
      this.viewFirstQuestion();
    }
    this.getInstructions();
  }

  getInstructions() {
    const instructions = this.test.instructions;
    this.instructions = Object.keys(instructions).map( key => {
      return {
        key,
        value: instructions[key].instruction,
        questions: instructions[key].questions,
      };
    });
  }

  getInfoTooltip(question: CQuestion) {
    if (!question) {
      return '';
    }
    const instruction = this.instructions.find( inf => inf.questions.includes(question.questionNum));
    return instruction.value;
  }

  async pauseTimer() {
    await this.loaderService.show();
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
    this.question.userAnswer = '';
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

  // view only methods
  async viewFirstQuestion() {
    await this.loaderService.show();
    this.isAnswerVisible = false;
    this.question = null;
    setTimeout(() => {
      this.question = this.test.questions[0];
      this.releaseLoader();
    }, 1);
  }

  async viewNextQuestion() {
    if (this.test.questionCount === this.question.questionNum) {
      return;
    }
    await this.loaderService.show();
    this.isAnswerVisible = false;
    const questionNum = this.question.questionNum;
    this.question = null;
    setTimeout(() => {
      this.question = this.test.questions.find( que => que.questionNum === (questionNum + 1));
      this.releaseLoader();
    }, 1);
  }

  async viewPrevQuestion() {
    await this.loaderService.show();
    this.isAnswerVisible = false;
    const questionNum = this.question.questionNum;
    this.question = null;
    setTimeout(() => {
      this.question = this.test.questions.find( que => que.questionNum === (questionNum - 1));
      this.releaseLoader();
    }, 1);
  }

  async setQuestionToView( question: CQuestion) {
    if (this.question === question) {
      return;
    }
    await this.loaderService.show();
    this.isAnswerVisible = false;
    this.question = null;
    setTimeout(() => {
      this.question = question;
      this.releaseLoader();
    }, 1);
  }

  releaseLoader() {
    setTimeout(() => {
      this.timerResume.emit();
      this.loaderService.hide();
    }, 2000);
  }

  async showAnswer() {
    try {
      await this.loaderService.show();
      const answer = await this.http.get('/questions/answer/' + this.question.id).toPromise();
      this.isAnswerVisible = true;
      this.answer = answer.answer;
      this.answerDescription =
        (answer.answerDescription.hasImage || answer.answerDescription.isImage || answer.answerDescription.statement)
        ? answer.answerDescription : null;
      this.releaseLoader();
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    }
  }

  ngOnDestroy() {
    this.question = null;
  }
}
