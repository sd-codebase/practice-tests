import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CStatement } from '@modules/user/test/test.model';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent implements OnInit {
  @Input() imagePath: string;
  @Input() statement: string;
  @Output() handleInputChange = new EventEmitter();
  public statementList: any = [];
  public inputValue = '';
  constructor() { }

  ngOnInit() {
    let statements;
    if (this.statement.includes('#')) {
      statements = this.statement.split('#');
    } else {
      statements = [this.statement];
    }
    statements.forEach( st => {
      let localStates;
      if (st.includes('*inputbox*')) {
        localStates = st.split('*inputbox*');
        this.statementList.push(this.getStatement(localStates[0]));
        this.statementList.push({type: 'input'});
        this.statementList.push(this.getStatement(localStates[1]));
      } else {
        this.statementList.push(this.getStatement(st));
      }
    });
  }

  getStatement(st: string) {
    return {content: st, type: this.getType(st)};
  }

  getType(st: string) {
    if (st.includes('$') || st.includes('\\begin') || st.includes('\\[')) {
      return 'math';
    }
    if (st.includes('.PNG')) {
      return 'image';
    }
    return 'text';
  }

  valueChanged() {
    this.handleInputChange.emit(this.inputValue);
  }

  fetchImage(src) {
    return `assets${this.imagePath.trim()}${src.trim()}`;
  }

}
