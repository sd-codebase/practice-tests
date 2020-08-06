import { Component, OnInit, Input } from '@angular/core';
import { GenerateTest } from '../generate-test-class';
import { ETestConfigType } from '@modules/admin/components/configure-mock-tests/configure-mock-tests.component';

@Component({
  selector: 'app-subjectwise',
  templateUrl: './subjectwise.component.html',
  styleUrls: ['./subjectwise.component.scss']
})
export class SubjectwiseComponent extends GenerateTest implements OnInit {
  @Input() data: any;
  public subjects: string[];

  ngOnInit() {
    this.subjects = Array.from(new Set(this.data.map( ob => ob.subject)));
  }

  createTest(subject) {
    this.generateTest({subject, type: ETestConfigType.SUBJECT, course: this.storage.getMyCourse()});
  }

}
