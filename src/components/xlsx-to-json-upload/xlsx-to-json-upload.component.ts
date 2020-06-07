import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-xlsx-to-json-upload',
  templateUrl: './xlsx-to-json-upload.component.html',
  styleUrls: ['./xlsx-to-json-upload.component.scss']
})
export class XlsxToJsonUploadComponent implements OnInit {
  @Output() handleUploadedData = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClickUpload() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.click();
  }

  onFileChange(ev) {
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
      jsonData = jsonData[names[0]].map( obj => {
        obj.options = [obj.op1, obj.op2, obj.op3, obj.op4, obj.op5];
        obj.answer = obj.answer.split(',').map(op => Number(op));
        delete obj.op1; delete obj.op2; delete obj.op3; delete obj.op4; delete obj.op5;
        return obj;
      });
      this.handleUploadedData.emit(jsonData);
    };
    reader.readAsBinaryString(file);
  }

}
