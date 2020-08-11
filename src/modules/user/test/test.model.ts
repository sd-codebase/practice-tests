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
    instructions: any[];
    paraObject: any[];
    totalMarks?: number;
}

export interface IInstructions {
    key: string;
    value: string;
    questions: number[];
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
    statement: string; // if isImage true question itself would be image
    containedImage: string; // if hasImage true, then img will have value
    isImage: boolean;
    hasImage: boolean;
    isImageFloated: boolean; // if only hasImage true then true or false
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
        this.class = chapter.class;
        this.subject = chapter.subject;
        this.chapter = chapter.chapter;
    }
}

export class CTopic extends CChapter {
    topic: string;

    constructor(topic: CTopic) {
        super(topic);
        this.topic = topic.topic;
    }
}

export class CQuestion {
    id?: string;
    question: string;
    options: string[];
    answer: string;
    answerDescription?: string;
    isSingleAnswer: boolean;
    userAnswer?: string;
    isSubmitted?: boolean;
    status?: EQuestionStatus;
    questionNum?: number;
    chapter: CChapter;
    tags: string;
    level: EQuestionLevels;
    imagePath: string;
    infoPara?: number;
    sortOrder?: number;
    obtainedMarks?: number;
    negativeMarks?: number;
    isCorrectAnswer?: number; // 0-false, 1-correct, 2- partial, undefine-unattempted

    constructor({id, question, options, answer, answerDescription, isSingleAnswer, chapter, level, tags, imagePath, infoPara}) {
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
        this.infoPara = infoPara;
    }
}
