import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subjectwise',
  templateUrl: './subjectwise.component.html',
  styleUrls: ['./subjectwise.component.scss']
})
export class SubjectwiseComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
