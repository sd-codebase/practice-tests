import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpService } from '@components/http.service';
import { LoaderService } from '@components/loader.service';
import { CQuestion } from '@modules/user/test/test.model';
import { DrawerService } from '@components/drawer-service';
import { NotificationService, ENotification, EError } from '@components/notifications.service';

const BUTTONS = [
  {disabled: false},
  {disabled: false},
  {disabled: false},
  {disabled: false},
  {disabled: false},
  {disabled: false},
  {disabled: false},
  {disabled: false},
  {disabled: false},
  {disabled: false},
  {disabled: false},
  {disabled: false},
  {disabled: false},
];

@Component({
  selector: 'app-validate-math-expression',
  templateUrl: './validate-math-expression.component.html',
  styleUrls: ['./validate-math-expression.component.scss']
})
export class ValidateMathExpressionComponent implements OnInit {
  public content: string;
  public isValidate = false;
  public matchedQuestion: CQuestion;
  public jsonContent = [];
  public buttons = BUTTONS;
  constructor(
    private loaderService: LoaderService,
    private http: HttpService,
    private drawerService: DrawerService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.drawerService.setPageHeader('Validate Expresssion');
  }

  onChange(changes: string) {
    // if (changes) {
    //   this.content = changes.split('\n').join(' ').trim();
    // } else {
    //   this.content = '';
    // }
    this.validate();
  }

  formatString() {
    this.content = this.content.split('\n').join(' ').replace(/\s\s+/g, ' ').trim();
    this.validate();
  }

  formatBreaksInString() {
    this.content = this.content.split('\n').join(' <br> ').trim();
    this.validate();
  }

  validate() {
    this.isValidate = false;
    setTimeout(() => {
      this.isValidate = true;
    }, 100);
  }

  addHashesBeforeQuestionNum() {
    let str = this.content;
    for (let i = 1; i < 150; i++) {
      str = str.replace('\n' + i + '. ', '\n##' + i + '. ');
    }
    this.content = str;
  }

  addHashesWithYearBeforeQuestionNum() {
    let str = this.content;
    for (let i = 1; i < 150; i++) {
      str = str.replace('\n' + i + '. ', '.[1947]##\n' + i + '. ');
    }
    this.content = str;
  }

  convertCompetetiveQueToJson() {
    const copyContent = this.content;
    const questionString = copyContent.replace('<table><tr><td>', '').replace('</td></tr></table>', '');
    const chunks = questionString.split('</td></tr><tr><td>');
    const finalJson = chunks.map( chunk => {
      const splittedChunk = chunk.split('</td><td>').map( chunk => {
        if (chunk !== null || chunk !== undefined) {
          return String(chunk);
        } else {
          return '';
        }
      });
      console.log(splittedChunk);
      return {
        srNo: splittedChunk[0].trim(),
        question: splittedChunk[1].trim() + (splittedChunk[3] ? '<br>' + splittedChunk[3].trim() : ''),
        tag: splittedChunk[2].trim(),
        options: [
          splittedChunk[4] ? splittedChunk[4].trim() : '',
          splittedChunk[5] ? splittedChunk[5].trim() : '',
          splittedChunk[6] ? splittedChunk[6].trim() : '',
          splittedChunk[7] ? splittedChunk[7].trim() : '',
        ],
      };
    });
    console.log(finalJson);
    console.log(JSON.stringify(finalJson));
    this.copyText(JSON.stringify(finalJson));
    this.jsonContent = finalJson;
  }

  formatForPasteAsTableCompQuestions() {
    const questions = this.content.split('##').map( que => {
      return '<tr><td>' + que.trim().replace('.', '</td><td>')
      .replace('पर्यायी उत्तरे :', '')
      .replace('ब)', '<br>ब)')
      .replace('क)', '<br>क)')
      .replace('ड)', '<br>ड)')
      .replace('1)', '</td><td>')
      .replace('2)', '</td><td>')
      .replace('3)', '</td><td>')
      .replace('4)', '</td><td>')
      .replace('.[', '</td><td>')
      .replace(']', '</td><td>') + '</td></tr>';
    });
    this.content = '<table>' + questions.join('') + '</table>';
    this.validate();
    this.copyText(this.content);
  }

  formatForPasteAsTable() {
    const questions = this.content.split('##').map( que => {
      return '<tr><td>' + que.trim().replace('.', '</td><td>')
      .replace('(a)', '</td><td>')
      .replace('(b)', '</td><td>')
      .replace('(c)', '</td><td>')
      .replace('(d)', '</td><td>')
      .replace('. [', '</td><td>')
      .replace(/.$/, '</td></tr>');
    });
    // let toReplace = this.content;
    // const content = '<table><tr><td>';
    // toReplace = content + toReplace
    //   .replace('.', '</td><td>')
    //   .replace('(a)', '</td><td>')
    //   .replace('(b)', '</td><td>')
    //   .replace('(c)', '</td><td>')
    //   .replace('(d)', '</td><td>')
    //   .replace('. (', '</td><td>')
    //   .replace(/.$/, '</td></tr></table>');
    // // toReplace = toReplace + '</td><td></td></tr></table>';
    // this.content = toReplace;
    this.content = '<table>' + questions.join('') + '</table>';
    this.validate();
    this.copyText(this.content);
  }

  async isQuestionExists() {
    this.matchedQuestion = null;
    try {
      await this.loaderService.show();
      this.matchedQuestion = await this.http.post('/questions/matching-question', {'question.statement': this.content})
        .toPromise() as CQuestion;
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }

  copyText(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  getAsTable(str) {
    const rows = str.split('##');
    const htmlRowsList = [];
    for (const row of rows) {
      const htmlColumns = row.split(',').map((chunk) => `<td>${chunk}</td>`);
      htmlRowsList.push(htmlColumns.join(''));
    }
    const htmlRowString = htmlRowsList.join(`</tr><tr>`);
    return `<table><tr>${htmlRowString}</tr></table>`;
  }

  createMathTableFromCoammaSaperatedContent() {
    const tables = this.content.split('###').map( str => this.getAsTable(str));
    this.content = tables.join('');
    // const strColumns = 'llllllllllllllll';
    // const rows = this.content.split('##');
    // const columnsLength = rows[0].split(',').length;
    // const rowsList = [];
    // const htmlRowsList = [];
    // for (const row of rows) {
    //   const columns = row.split(',').map((chunk) => `\\text { ${chunk} }`);
    //   rowsList.push(columns.join(' & '));
    //   const htmlColumns = row.split(',').map((chunk) => `<td>${chunk}</td>`);
    //   htmlRowsList.push(htmlColumns.join(''));
    // }
    // const rowString = rowsList.join(` \\\\ `);
    // const htmlRowString = htmlRowsList.join(`</tr><tr>`);
    // this.content = `
    // <table><tr>${htmlRowString}</tr></table>

    // $\\begin{array}{${strColumns.slice(0, columnsLength)}} ${rowString} \\end{array}$
    // `;
    this.validate();
  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  formatAnswerToPaste() {
    const answers = this.content.split('#(').map( str => {
      return '<tr><td>' + str.replace(') :', '</td><td>') + '</td></tr>';
    });

    this.content = '<table>' + answers.join('') + '</table>';
    this.validate();
    this.copyText(this.content);
  }

}
