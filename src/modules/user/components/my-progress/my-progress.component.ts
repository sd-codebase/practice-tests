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
    height: 300,
  };

  chartColumns = ['X', 'Progress'];

  constructor() { }

  ngOnInit() {
  }

}
