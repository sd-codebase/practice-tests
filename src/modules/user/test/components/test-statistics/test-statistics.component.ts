import { Component, OnInit, Input } from '@angular/core';
import { ITest } from '../../test.model';

@Component({
  selector: 'app-test-statistics',
  templateUrl: './test-statistics.component.html',
  styleUrls: ['./test-statistics.component.scss']
})
export class TestStatisticsComponent implements OnInit {
  @Input() test: ITest;
  public score = {
    score: 0,
    positive: 0,
    negative: 0,
  };
  piData = [
    ['Correct', 0],
    ['Wrong', 0],
    ['Partial', 0],
    ['Skipped', 0],
  ];
  columnData = [
    ['Correct', 0],
    ['Wrong', 0],
    ['Partial', 0],
    ['Skipped', 0],
  ];
  piOptions = {
    title: 'Test Analysis',
    pieHole: 0.4,
    width: 340,
    height: 254,
    colors: ['#109618', '#dc3912', '#ff8c00', '#3366cc']
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
    this.score = {
      score: 0,
      positive: 0,
      negative: 0,
    };
    this.test.questions.forEach( que => {
      this.score.positive += (que.obtainedMarks ? que.obtainedMarks : 0);
      this.score.negative += (que.negativeMarks ? que.negativeMarks : 0);
    });
    this.score.score = this.score.positive - this.score.negative;

    this.piData[0][1] = this.test.questions.filter( que => que.isCorrectAnswer === 1).length;
    this.piData[1][1] = this.test.questions.filter( que => que.isCorrectAnswer === 0).length;
    this.piData[2][1] = this.test.questions.filter( que => que.isCorrectAnswer === 2).length;
    this.piData[3][1] = this.test.questions.filter( que => que.isCorrectAnswer === undefined).length;

    this.columnData[0][1] = this.test.questions.filter( que => que.isCorrectAnswer === 1).length;
    this.columnData[1][1] = this.test.questions.filter( que => que.isCorrectAnswer === 0).length;
    this.columnData[2][1] = this.test.questions.filter( que => que.isCorrectAnswer === 2).length;
    this.columnData[3][1] = this.test.questions.filter( que => que.isCorrectAnswer === undefined).length;
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
