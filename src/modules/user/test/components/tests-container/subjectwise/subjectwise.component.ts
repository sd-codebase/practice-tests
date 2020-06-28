import { Component, OnInit, Input } from '@angular/core';
import { GenerateTest } from '../generate-test-class';

@Component({
  selector: 'app-subjectwise',
  templateUrl: './subjectwise.component.html',
  styleUrls: ['./subjectwise.component.scss']
})
export class SubjectwiseComponent extends GenerateTest implements OnInit {
  @Input() data: any;

  ngOnInit() {
  }

  createTest(subject) {
    this.generateTest({questionCount: 60, subject});
  }

}
