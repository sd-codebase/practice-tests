import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CStatement } from '@modules/user/test/test.model';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent implements OnInit {
  @Input() statement: CStatement;
  @Output() handleInputChange = new EventEmitter();
  public statementList: string[];
  public hasInputBox = false;
  public inputValue = '';
  constructor() { }

  ngOnInit() {
    if (this.statement.statement && this.statement.statement.includes('*inputbox*')) {
      this.hasInputBox = true;
      this.statementList = this.statement.statement.split('*inputbox*');
    }
  }

  valueChanged() {
    this.handleInputChange.emit(this.inputValue);
  }

  fetchImage(src) {
    return 'assets/questions/science/12/mathematics/maths_chapter_1/' + src + '.png';
  }

}
