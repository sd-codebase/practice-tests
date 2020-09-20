import { Component, OnInit } from '@angular/core';
import { StorageService } from '@components/storage.serice';
import { Router } from '@angular/router';
import { IEndpoint } from 'src/auth/authentication/authentication.service';
import { HttpService } from '@components/http.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '@components/dialog-box/dialog-box.component';

@Component({
  selector: 'app-dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss']
})
export class DashboardWidgetComponent implements OnInit {
  public courses: IEndpoint[] = [];
  public showClear = false;
  public userProfile;
  public priorityMessages = [];
  constructor(
    private storageService: StorageService,
    private router: Router,
    private http: HttpService,
    private dialogService: MatDialog,
  ) { }

  async ngOnInit() {
    this.userProfile = this.storageService.getUser();
    const onGoingTests = this.storageService.getOngoingTest();
    this.showClear = Object.keys(onGoingTests).length > 5;
    try {
      const promises = [this.http.get('/users/notifications?critical=true').toPromise(), this.http.get('/users/courses').toPromise()];
      const [priorityMessages, courses] = await Promise.all(promises);
      this.courses = courses.filter( course => course.course !== 'All');
      this.priorityMessages = priorityMessages;
    } catch (e) { }
  }

  onClearStorage() {
    this.storageService.clearStorage();
    this.router.navigate(['/']);
  }

  clearStorage() {
    const dialogRef = this.dialogService.open(DialogBoxComponent, {
      data: {
        type: 'Confirm',
        message: 'Clearing will remove your test progress. In progress tests will have to start again. Are you sure to delete this test?',
        button1: {text: 'Yes', value: true, color: 'primary'},
        button2: {text: 'No, Do not clear', value: false},
      }
    });
    dialogRef.afterClosed().subscribe( val => {
      if (val) {
        this.onClearStorage();
      }
    });
  }

}
