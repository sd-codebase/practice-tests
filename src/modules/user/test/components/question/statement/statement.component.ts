import { Component, OnInit, Input } from '@angular/core';
import { CStatement } from '@modules/user/test/test.model';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent implements OnInit {
  @Input() statement: CStatement;
  constructor() { }

  ngOnInit() {
  }

  fetchImage(src) {
    return 'assets/questions/science/12/mathematics/maths_chapter_1/' + src + '.png';
  }

}
