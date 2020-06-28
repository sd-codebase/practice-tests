import { Component, OnInit, Input } from '@angular/core';
import { ITest } from '../../test.model';

@Component({
  selector: 'app-test-statistics',
  templateUrl: './test-statistics.component.html',
  styleUrls: ['./test-statistics.component.scss']
})
export class TestStatisticsComponent implements OnInit {
  @Input() test: ITest;
  piData = [
    ['Correct', 0],
    ['Wrong', 0],
    ['Skipped', 0],
  ];
  columnData = [
    ['Correct', 0],
    ['Wrong', 0],
    ['Skipped', 0],
  ];
  piOptions = {
    title: 'Test Analysis',
    pieHole: 0.4,
    width: 340,
    height: 254,
    colors: ['#109618', '#dc3912', '#3366cc']
  };
  columnOptions = {
    title: 'Test Analysis',
    width: 340,
    height: 254,
    bar: {groupWidth: '95%'},
    legend: { position: 'none' },
    colors: ['#3366cc', '#dc3912', '#109618']
  };
  constructor() { }

  ngOnInit() {
    this.piData[0][1] = this.test.correctCount;
    this.piData[1][1] = this.test.attemptCount - this.test.correctCount;
    this.piData[2][1] = this.test.questionCount - this.test.attemptCount;

    this.columnData[0][1] = this.test.correctCount;
    this.columnData[1][1] = this.test.attemptCount - this.test.correctCount;
    this.columnData[2][1] = this.test.questionCount - this.test.attemptCount;

    // this.columnData[0][1] = this.test.percentage;
    // this.columnData[1][1] = (this.test.attemptCount - this.test.correctCount) / this.test.questionCount * 100;
    // this.columnData[2][1] =
    // this.test.attemptCount === this.test.questionCount
    // ? 0 : (this.test.questionCount - this.test.attemptCount) / this.test.questionCount * 100;
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
