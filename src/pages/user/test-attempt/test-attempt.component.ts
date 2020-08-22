import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DrawerService } from '@components/drawer-service';
import { DeactivationGuarded } from 'src/guards/candeactivate.guard';
import { CreateTestComponent } from '@modules/user/test/components/create-test/create-test.component';
import { ETestStatus } from '@modules/user/test/test.model';
import { DialogBoxComponent } from '@components/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '@components/storage.serice';

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
    public dialog: MatDialog,
    private storageService: StorageService,
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

  canDeactivate(): Observable<boolean> | boolean {
    const test = this.createTestComponent.test;
    const session = this.storageService.getExpiryTime();
    if (session && test && test.status === ETestStatus.STARTED) {
      const dialogRef = this.dialog.open(DialogBoxComponent, {
        data: {
          type: 'Confirm',
          message: 'Test is in progress. If you exits progress will be stored, Do you wish to exit?',
          button1: {text: 'Yes', value: true, color: 'primary'},
          button2: {text: 'No, stay for a while', value: false},
        }
      });
      return dialogRef.afterClosed();
    } else {
      return true;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
