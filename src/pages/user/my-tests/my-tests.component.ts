import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-tests',
  templateUrl: './my-tests.component.html',
  styleUrls: ['./my-tests.component.scss']
})
export class MyTestsComponent implements OnInit {
  public pageHeader = 'My tests';
  constructor() { }

  ngOnInit() {
  }

}
