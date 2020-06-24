import { Component, OnInit, Input } from '@angular/core';
import { GenerateTest } from '../generate-test-class';

@Component({
  selector: 'app-chapterwise',
  templateUrl: './chapterwise.component.html',
  styleUrls: ['./chapterwise.component.scss']
})
export class ChapterwiseComponent extends GenerateTest implements OnInit {
  @Input() data: any;

  ngOnInit() {
  }

  createTest() {
    this.generateTest({questionCount: 50});
  }

}
