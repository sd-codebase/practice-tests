import { Component, OnInit, Input } from '@angular/core';
import { GenerateTest } from '../generate-test-class';
import { ETestConfigType } from '@modules/admin/components/configure-mock-tests/configure-mock-tests.component';

@Component({
  selector: 'app-topicwise',
  templateUrl: './topicwise.component.html',
  styleUrls: ['./topicwise.component.scss']
})
export class TopicwiseComponent extends GenerateTest implements OnInit {
  @Input() data: any;
  public subjects: string[];

  ngOnInit() {
    this.subjects = Array.from(new Set(this.data.map( ob => ob.subject)));
  }

  getChapters(subject: string) {
    return Array.from(new Set(this.data.filter(ob => ob.subject === subject).map( ob => ob.chapter)));
  }

  getTopics(chapter: string) {
    return Array.from(new Set(this.data.filter(ob => ob.chapter === chapter).map( ob => ob.topic)));
  }

  createTest(subject, chapter, topic) {
    this.generateTest({subject, chapter, topic, type: ETestConfigType.TOPIC, course: this.storage.getMyCourse()});
  }

}
