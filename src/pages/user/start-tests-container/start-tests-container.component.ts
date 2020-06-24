import { Component, OnInit } from '@angular/core';
import { GenerateTest } from '@modules/user/test/components/tests-container/generate-test-class';

@Component({
  selector: 'app-start-tests-container',
  templateUrl: './start-tests-container.component.html',
  styleUrls: ['./start-tests-container.component.scss']
})
export class StartTestsContainerComponent extends GenerateTest implements OnInit {
  public data = {stream: 'Science', class: '12', subjects: [
    { name: 'Mathematics', chapters: [
      { name: 'Trogonometric Functions & Equations', topics: [
        {name: 'Topic 1' }, {name: 'Topic 1' }, {name: 'Topic 1' },
      ]},
      { name: 'Complex Numbers', topics: [
        {name: 'Topic 1' }, {name: 'Topic 1' }, {name: 'Topic 1' },
      ]},
    ]},
    { name: 'Chemistry', chapters: [
      { name: 'Basic Concepts Of Chemistry', topics: [
        {name: 'Topic 1' }, {name: 'Topic 1' }, {name: 'Topic 1' },
      ]},
      { name: 'Basic Concepts Of Chemistry', topics: [
        {name: 'Topic 1' }, {name: 'Topic 1' }, {name: 'Topic 1' },
      ]},
    ]},
    { name: 'Biology', chapters: [
      { name: 'Basic Concepts Of Chemistry', topics: [
        {name: 'Topic 1' }, {name: 'Topic 1' }, {name: 'Topic 1' },
      ]},
      { name: 'Basic Concepts Of Chemistry', topics: [
        {name: 'Topic 1' }, {name: 'Topic 1' }, {name: 'Topic 1' },
      ]},
    ]},
    { name: 'Physics', chapters: [
      { name: 'Basic Concepts Of Chemistry', topics: [
        {name: 'Topic 1' }, {name: 'Topic 1' }, {name: 'Topic 1' },
      ]},
      { name: 'Basic Concepts Of Chemistry', topics: [
        {name: 'Topic 1' }, {name: 'Topic 1' }, {name: 'Topic 1' },
      ]},
    ]}
  ]};

  ngOnInit() {

  }

  createTest() {
    this.generateTest();
  }

}
