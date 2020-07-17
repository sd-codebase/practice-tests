import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@components/drawer-service';
import { LoaderService } from '@components/loader.service';
import { CTopic } from '@modules/user/test/test.model';
import { HttpService } from '@components/http.service';
import { StorageService } from '@components/storage.serice';

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
  ) { }

  ngOnInit() {
    this.drawerService.setPageHeader('Import Topics');
  }

  onDataRead({names, jsonData}) {
    this.loaderService.show();
    setTimeout(() => {
      this.uploadData(names, jsonData);
    }, 100);
  }

  async uploadData(names, jsonData) {
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
    this.uploadedData = await this.http.post(this.urlToUpload, {chapters: dataToPush, userId: this.storage.getUserId()}).toPromise();
    this.loaderService.hide();
  }
}
