import { Component, OnInit } from '@angular/core';
import { HttpService } from '@components/http.service';

@Component({
  selector: 'app-import-questions',
  templateUrl: './import-questions.component.html',
  styleUrls: ['./import-questions.component.scss']
})
export class ImportQuestionsComponent implements OnInit {
  public urlToUpload = '/questions/import';
  public uploadData: any;
  constructor(
    private http: HttpService,
  ) { }

  ngOnInit() {
  }

  async onDataRead(readData) {
    this.uploadData = await this.http.post(this.urlToUpload, readData).toPromise();
  }
}
