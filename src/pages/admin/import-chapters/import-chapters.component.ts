import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';
import { LoaderService } from '@components/loader.service';
import { CTopic } from '@modules/user/test/test.model';
import { HttpService } from '@components/http.service';
import { StorageService } from '@components/storage.serice';
import { NotificationService, ENotification, EError } from '@components/notifications.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '@components/dialog-box/dialog-box.component';

@Component({
  selector: 'app-import-chapters',
  templateUrl: './import-chapters.component.html',
  styleUrls: ['./import-chapters.component.scss']
})
export class ImportChaptersComponent implements OnInit {
  public urlToUpload = '/chapters/import';
  public uploadedData: any;
  constructor(
    private http: HttpService,
    private loaderService: LoaderService,
    private drawerService: DrawerService,
    private storage: StorageService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.drawerService.setPageHeader('Import Topics');
  }

  async onDataRead({names, jsonData, courses}) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        type: 'Confirm',
        message: `Do you want to upload ${names[0]}`,
        button1: {text: 'Yes', value: true, color: 'primary'},
        button2: {text: 'No, do not upload', value: false},
      }
    });
    dialogRef.afterClosed().subscribe( val => {
      if (val) {
        this.uploadData(names, jsonData, courses);
      }
    });
  }

  async uploadData(names, jsonData, course) {
    try {
      await this.loaderService.show();
      const dataToPush: CTopic[] = [];
      jsonData[names[0]].forEach( data => {
        const topic = new CTopic(data);
        // Object.keys(topic).forEach(key => {
        //   if (topic[key] !== '') {
        //     topic[key] = topic[key].trim();
        //   }
        // });
        dataToPush.push(topic);
      });
      this.uploadedData = await this.http.post(this.urlToUpload, {
        chapters: dataToPush, userId: this.storage.getUserId(), course,
      }).toPromise();
    } catch (e) {
      this.notificationService.show(ENotification.DANGER, EError.UNHANDLED, e.message);
    } finally {
      this.loaderService.hide();
    }
  }
}
