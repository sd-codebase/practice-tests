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

export class CStatement {
    statement: string; //if isImage true question itself would be image
    containedImage: string; //if hasImage true, then img will have value 
    isImage: boolean;
    hasImage: boolean;
    isImageFloated: boolean; //if only hasImage true then true or false
    isMathExpression: boolean;

    constructor(st: string, containedImage: string, statement: CStatement) {
        this.statement = st;
        this.containedImage = containedImage ? containedImage.toString() : '';
        this.isImage = statement.isImage;
        this.hasImage = statement.hasImage;
        this.isImageFloated = statement.isImageFloated;
        this.isMathExpression = statement.isMathExpression;
    }
}

export class CChapter {
    stream: string;
    class: string;
    subject: string;
    chapter: string;

    constructor(chapter: CChapter) {
        this.stream = chapter.stream;
        this.class = chapter.stream;
        this.subject = chapter.subject;
        this.chapter = chapter.chapter;
    }
}

export class CQuestion {
    id?: string;
    question: CStatement;
    options: CStatement[];
    answer: number[] | number;
    isSingleAnswer: boolean;
    userAnswer?: number[] = [];
    isSubmitted?: boolean;
    status?: EQuestionStatus;
    questionNum?: number;
    chapter: CChapter;

    constructor({_id, question, options, answer, isSingleAnswer, chapter}) {
        this.id = _id;
        this.question = question;
        this.options = options;
        this.answer = answer;
        this.isSingleAnswer = isSingleAnswer;
        this.chapter = chapter;
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