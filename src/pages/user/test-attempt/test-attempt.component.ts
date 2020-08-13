import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DrawerService } from '@components/drawer-service';
import { DeactivationGuarded } from 'src/guards/candeactivate.guard';
import { CreateTestComponent } from '@modules/user/test/components/create-test/create-test.component';
import { ETestStatus } from '@modules/user/test/test.model';

@Component({
  selector: 'app-test-attempt',
  templateUrl: './test-attempt.component.html',
  styleUrls: ['./test-attempt.component.scss']
})
export class TestAttemptComponent implements OnInit, OnDestroy, DeactivationGuarded {
  @ViewChild('createTest', {static: false}) createTestComponent: CreateTestComponent;
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

  @HostListener('window:beforeunload') saveTestProgress() {
    this.createTestComponent.saveTestProgress();
  }

  canDeactivate(): boolean {
    const test = this.createTestComponent.test;
    if (test.status === ETestStatus.STARTED) {
      const input = confirm('Test is in progress. If you exits progress will be stored, Do you wish to exit?');
      if (input) {
        this.createTestComponent.saveTestProgress();
      }
      return input;
    }
    return true;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
