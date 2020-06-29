export interface ITest {
    status: ETestStatus;
    _id?: string;
    id: string;
    questionCount: number;
    attemptCount: number;
    correctCount: number;
    questions: CQuestion[];
    allottedTime: number;
    completeTime: number;
    percentage: number;
    testName?: string;
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

export enum EQuestionLevels {
    Pro = 1,
    Advance = 2,
    Mid = 3,
    Easy = 4,
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
    answer: string;
    answerDescription?: CStatement;
    isSingleAnswer: boolean;
    userAnswer?: string;
    isSubmitted?: boolean;
    status?: EQuestionStatus;
    questionNum?: number;
    chapter: CChapter;
    tags: string;
    level: EQuestionLevels;
    imagePath: string;

    constructor({id, question, options, answer, answerDescription, isSingleAnswer, chapter, level, tags, imagePath}) {
        this.id = id;
        this.question = question;
        this.options = options;
        this.answer = answer;
        this.answerDescription = answerDescription;
        this.isSingleAnswer = isSingleAnswer;
        this.chapter = chapter;
        this.tags = tags;
        this.level = level;
        this.imagePath = imagePath;
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
