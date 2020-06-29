import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DrawerService } from '@components/drawer-service';

@Component({
  selector: 'app-test-answer-key',
  templateUrl: './test-answer-key.component.html',
  styleUrls: ['./test-answer-key.component.scss']
})
export class TestAnswerKeyComponent implements OnInit {
  private sub: Subscription;
  public testId: string;
  constructor(
    private route: ActivatedRoute,
    private drawerService: DrawerService,
  ) { }

  ngOnInit() {
    this.drawerService.setPageHeader('Test Answer Key');
    this.sub = this.route.params.subscribe(params => {
      this.testId = params.testId;
   });
  }

}
