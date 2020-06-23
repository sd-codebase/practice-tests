import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-attempt',
  templateUrl: './test-attempt.component.html',
  styleUrls: ['./test-attempt.component.scss']
})
export class TestAttemptComponent implements OnInit {
  private sub: Subscription;
  public testId: string;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.testId = params.testId;
   });
  }

}
