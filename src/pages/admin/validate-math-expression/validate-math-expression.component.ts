import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-validate-math-expression',
  templateUrl: './validate-math-expression.component.html',
  styleUrls: ['./validate-math-expression.component.scss']
})
export class ValidateMathExpressionComponent implements OnInit {
  public content: string;
  public isValidate = false;
  constructor() { }

  ngOnInit() {
  }

  onChange(changes: string) {
    if (changes) {
      this.content = changes.split('\n').join(' ').trim();
    } else {
      this.content = '';
    }
  }

  validate() {
    this.isValidate = false;
    setTimeout(() => {
      this.isValidate = true;
    }, 100)
  }

}
