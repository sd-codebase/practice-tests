import { Component, OnInit, Input } from '@angular/core';
import { GenerateTest } from '../generate-test-class';

@Component({
  selector: 'app-topicwise',
  templateUrl: './topicwise.component.html',
  styleUrls: ['./topicwise.component.scss']
})
export class TopicwiseComponent extends GenerateTest implements OnInit {
  @Input() data: any;

  ngOnInit() {
  }

  createTest() {
    this.generateTest({questionCount: 10});
  }

}
