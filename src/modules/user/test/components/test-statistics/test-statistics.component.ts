import { Component, OnInit, Input } from '@angular/core';
import { ITest } from '../../test.model';

@Component({
  selector: 'app-test-statistics',
  templateUrl: './test-statistics.component.html',
  styleUrls: ['./test-statistics.component.scss']
})
export class TestStatisticsComponent implements OnInit {
  @Input() test: ITest;

  constructor() { }

  ngOnInit() {
  }

  getButtonColor(num1, num2) {
    const num = num1 / num2 * 100;
    if (num <= 40) {
      return 'warn';
    } else if (num > 40 && num <= 70) {
      return 'accent';
    } else if (num > 70 && num <= 100) {
      return 'success';
    }
  }

}
