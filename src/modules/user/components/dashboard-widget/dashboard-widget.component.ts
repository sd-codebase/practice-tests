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
  constructor(
    private storageService: StorageService,
    private router: Router,
    private http: HttpService,
    private dialogService: MatDialog,
  ) { }

  async ngOnInit() {
    const onGoingTests = this.storageService.getOngoingTest();
    this.showClear = Object.keys(onGoingTests).length > 5;
    try {
      const courses = await this.http.get('/users/courses').toPromise() as IEndpoint[];
      this.courses = courses.filter( course => course.course !== 'All');
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
