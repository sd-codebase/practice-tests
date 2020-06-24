import { Component } from '@angular/core';
import { GenerateTest } from '../tests-container/generate-test-class';

@Component({
  selector: 'app-generate-test',
  templateUrl: './generate-test.component.html',
  styleUrls: ['./generate-test.component.scss']
})
export class GenerateTestComponent extends GenerateTest {
  createTest() {
    this.generateTest({questionCount: 50});
  }
}
