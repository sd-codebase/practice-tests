import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DrawerService } from '@components/drawer-service';

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
    private drawerService: DrawerService,
  ) { }

  ngOnInit() {
    this.drawerService.setPageHeader('Attempt Test');
    this.sub = this.route.params.subscribe(params => {
      this.testId = params.testId;
   });
  }

}
