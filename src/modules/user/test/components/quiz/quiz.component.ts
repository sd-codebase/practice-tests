import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ITest, CQuestion, EQuestionStatus, CStatement, IInstructions } from '../../test.model';
import { LoaderService } from '@components/loader.service';
import { HttpService } from '@components/http.service';
import { NotificationService, ENotification, EError } from '@components/notifications.service';
import { MatDialog } from '@angular/material/dialog';
import { QuestionInformationDialogComponent } from '../question-information-dialog/question-information-dialog.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  @Input() test: ITest;
  @Input() action: string;
  @Input() startwithQuestion = 1;

  @Output() openQuestionPallet = new EventEmitter();
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
    private dilogService: MatDialog,
  ) { }

  ngOnInit() {
    if (this.action === 'attempt') {
      this.specifiedQuestion(this.startwithQuestion);
    } else if (this.action === 'view') {
      this.viewFirstQuestion();
    }
    this.getInstructions();
  }

  getInstructions() {
    if (!this.test.instructions) {
      return {};
    }
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
    if (!question || !this.instructions) {
      return null;
    }
    const instruction = this.instructions.find( inf => inf.questions.includes(question.questionNum));
    return `<strong>${instruction.key}</strong><br>${instruction.value}`;
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


  specifiedQuestion(questionNum) {
    this.pauseTimer();
    this.question = null;
    setTimeout(() => {
      this.question = this.test.questions.find( que => que.questionNum === questionNum);
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

  openInfoToolTipDialog() {
    const content = this.getInfoTooltip(this.question);
    const dialogRef = this.dilogService.open(QuestionInformationDialogComponent, {
      data: {
        paper: this.test.testName,
        content,
        imagePath: '/instructions/',
      }
    });
  }

  openInfoParaDialog() {
    if (this.test.paraObject && this.test.paraObject.length) {
      const { content } = this.test.paraObject.find( para => para.paraId === this.question.infoPara);
      const dialogRef = this.dilogService.open(QuestionInformationDialogComponent, {
        data: {
          paper: this.test.testName,
          content,
          imagePath: '/paragraphs/',
        }
      });
    }
  }

  ngOnDestroy() {
    this.question = null;
  }
}
