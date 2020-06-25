import { Component, OnInit, Input } from '@angular/core';
import { ITest } from '../../test.model';

@Component({
  selector: 'app-test-statistics',
  templateUrl: './test-statistics.component.html',
  styleUrls: ['./test-statistics.component.scss']
})
export class TestStatisticsComponent implements OnInit {
  @Input() test: ITest;
  myData = [
    ['London', 8136000],
    ['New York', 8538000],
    ['Paris', 2244000],
    ['Berlin', 3470000],
    ['Kairo', 19500000],
  ];
  options = {
    title: 'My Daily Activities',
    pieHole: 0.4,
  };
  optionsColumn = {
    title: 'Density of Precious Metals, in g/cm^3',
    width: 300,
    height: 200,
    bar: {groupWidth: '95%'},
    legend: { position: 'none' },
  };
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
