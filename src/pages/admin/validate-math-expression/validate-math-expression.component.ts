import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpService } from '@components/http.service';
import { LoaderService } from '@components/loader.service';
import { CQuestion } from '@modules/user/test/test.model';
import { DrawerService } from '@components/drawer-service';
import { NotificationService, ENotification, EError } from '@components/notifications.service';

@Component({
  selector: 'app-validate-math-expression',
  templateUrl: './validate-math-expression.component.html',
  styleUrls: ['./validate-math-expression.component.scss']
})
export class ValidateMathExpressionComponent implements OnInit {
  public content: string;
  public isValidate = false;
  public matchedQuestion: CQuestion;
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

  convertCompetetiveQueToJson() {
    const questionString = this.content.replace('<table><tr><td>', '').replace('</td></tr></table>', '');
    const chunks = questionString.split('</td></tr><tr><td>');
    const finalJson = chunks.map( chunk => {
      const splittedChunk = chunk.split('</td><td>');
      return {
        srNo: splittedChunk[0].toString().trim(),
        question: splittedChunk[1].toString().trim() + (splittedChunk[3] ? '<br>' + splittedChunk[3].toString().trim() : ''),
        tag: splittedChunk[2].toString().trim(),
        options: [
          splittedChunk[4].toString().trim(),
          splittedChunk[5].toString().trim(),
          splittedChunk[6].toString().trim(),
          splittedChunk[7].toString().trim()
        ],
      };
    });
    console.log(finalJson);
    console.log(JSON.stringify(finalJson));
    this.copyText(JSON.stringify(finalJson));
  }

  formatForPasteAsTableDummy() {
    const questions = this.content.split('##').map( que => {
      return '<tr><td>' + que.trim().replace('.', '</td><td>')
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
