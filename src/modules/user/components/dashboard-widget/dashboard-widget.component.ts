import { Component, OnInit } from '@angular/core';
import { StorageService } from '@components/storage.serice';
import { Router } from '@angular/router';
import { IEndpoint } from 'src/auth/authentication/authentication.service';
import { HttpService } from '@components/http.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '@components/dialog-box/dialog-box.component';
import { AvailableCoursesService } from '@components/AvailableCoursesService';

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
  public infoMessages = [];
  public newVersion: AppVersion;
  constructor(
    private storageService: StorageService,
    private router: Router,
    private http: HttpService,
    private dialogService: MatDialog,
    private availableCourseService: AvailableCoursesService,
  ) { }

  async ngOnInit() {
    this.userProfile = this.storageService.getUser();
    const onGoingTests = this.storageService.getOngoingTest();
    this.showClear = Object.keys(onGoingTests).length > 5;
    try {
      const promises = [
        this.http.get('/users/notifications?critical=true').toPromise(),
        this.http.get('/users/notifications?info=true').toPromise(),
        this.http.get('/users/courses').toPromise()
      ];
      const [priorityMessages, infoMessages, courses] = await Promise.all(promises);
      this.courses = courses.filter( course => course.course !== 'All');
      if (this.availableCourseService.availableCourse) {
        this.courses = this.courses.filter( crs => crs.course === this.availableCourseService.availableCourse)
      }
      this.priorityMessages = priorityMessages;
      this.infoMessages = infoMessages;
    } catch (e) { }
    if (this.availableCourseService.availableCourse && this.availableCourseService.appVersion) {
      this.getVersionDetails();
    }
  }

  async getVersionDetails() {
    try{
      const versionDetails: AppVersion = await this.http.get('/users/app-version').toPromise();
      if(versionDetails.version > this.availableCourseService.appVersion) {
        this.newVersion = versionDetails;
      }
    } catch(e) {

    }
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

export interface AppVersion {
  version: string;
  isMajorUpdate: boolean;
  updateInfo: string;
  updateDate: string;
}
