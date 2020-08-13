import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';
import { LoaderService } from '@components/loader.service';
import { COURSES } from '@modules/user/test/test.model';

@Component({
  selector: 'app-xlsx-to-json-upload',
  templateUrl: './xlsx-to-json-upload.component.html',
  styleUrls: ['./xlsx-to-json-upload.component.scss']
})
export class XlsxToJsonUploadComponent implements OnInit {
  @Output() handleUploadedData = new EventEmitter();
  public courses = Object.keys(COURSES).map( key => COURSES[key]);
  public selectedCourses: string[] = [];

  constructor(
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
  }

  onClickUpload() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.click();
  }

  async onFileChange(ev) {
    await this.loaderService.show();
    let workBook = null;
    let jsonData = null;
    const names: string[] = [];
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        names.push(name);
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      setTimeout( () => {
        this.loaderService.hide();
        this.handleUploadedData.emit({names, jsonData, courses: this.selectedCourses});
      }, 500);
    };
    reader.readAsBinaryString(file);
  }

}
