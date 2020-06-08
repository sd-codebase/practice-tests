export interface ITest {
    status: ETestStatus;
    id: string;
    questionCount: number;
    attemptCount: number;
    correctCount: number;
    questions: CQuestion[];
    allottedTime: number;
    completeTime: number;
    percentage: number;
}

export enum ETestStatus {
    CREATED,
    STARTED,
    FINISHED
}

export enum EQuestionStatus {
    NOTVISITED,
    ANSWERED,
    UNANSWERED,
    MARKED,
    MARKEDANSWERD
}

export class CQuestion {
    id?: string;
    question: string;
    options: string[];
    isQuestionImage: boolean;
    isOptionImage: boolean[];
    answer?: number[];
    userAnswer?: number[] = [];
    isSubmitted = false;
    correctAnswer?: boolean;
    status?: EQuestionStatus;
    questionNum?: number;

    constructor({_id, question, options, answer}) {
        this.id = _id;
        this.question = question;
        this.options = options;
        this.answer = answer;
        this.status = EQuestionStatus.NOTVISITED;
    }

    isCorrectAnswer() {
        // this.isSubmitted = true;
        // if (this.userAnswer && this.answer && this.userAnswer.length === this.answer.length) {
        //     this.correctAnswer = this.answer.every( opNum => this.userAnswer.includes(opNum) );
        // } else{
        //     this.correctAnswer = false;
        // }
    }
}
