import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-progress',
  templateUrl: './my-progress.component.html',
  styleUrls: ['./my-progress.component.scss']
})
export class MyProgressComponent implements OnInit {
  lineData = [
    [0, 0],
    [1, 10],
    [2, 20],
    [3, 10],
    [4, 28],
    [5, 50],
    [6, 60],
  ];

  lineOptions = {
    title: 'Progress Analysis',
    width: 600,
    height: 250,
  };

  chartColumns = ['X', 'Progress'];

  // fake charts

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
    width: 400,
    height: 254,
    colors: ['#109618', '#dc3912', '#3366cc']
  };
  columnOptions = {
    title: 'Test Analysis',
    width: 500,
    height: 254,
    bar: {groupWidth: '95%'},
    legend: { position: 'none' },
    colors: ['#3366cc', '#dc3912', '#109618']
  };

  constructor() { }

  ngOnInit() {
    this.piData[0][1] = 150;
    this.piData[1][1] = 21;
    this.piData[2][1] = 9;

    this.columnData[0][1] = 130;
    this.columnData[1][1] = 5;
    this.columnData[2][1] = 15;
  }

}
