import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chapterwise',
  templateUrl: './chapterwise.component.html',
  styleUrls: ['./chapterwise.component.scss']
})
export class ChapterwiseComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
