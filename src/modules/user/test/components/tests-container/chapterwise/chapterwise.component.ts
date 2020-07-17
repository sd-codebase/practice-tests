import { Component, OnInit, Input } from '@angular/core';
import { GenerateTest } from '../generate-test-class';
import { CTopic } from '@modules/user/test/test.model';

@Component({
  selector: 'app-chapterwise',
  templateUrl: './chapterwise.component.html',
  styleUrls: ['./chapterwise.component.scss']
})
export class ChapterwiseComponent extends GenerateTest implements OnInit {
  @Input() data: CTopic[];
  public subjects: string[];

  ngOnInit() {
    this.subjects = Array.from(new Set(this.data.map( ob => ob.subject)));
  }

  getChapters(subject: string) {
    return Array.from(new Set(this.data.filter(ob => ob.subject === subject).map( ob => ob.chapter)));
  }

  createTest() {
    this.generateTest({questionCount: 20});
  }

}
