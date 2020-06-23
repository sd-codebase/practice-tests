import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-topicwise',
  templateUrl: './topicwise.component.html',
  styleUrls: ['./topicwise.component.scss']
})
export class TopicwiseComponent implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit() {
  }

}
