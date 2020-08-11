import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CStatement } from '../../test.model';

@Component({
  selector: 'app-question-information-dialog',
  templateUrl: './question-information-dialog.component.html',
  styleUrls: ['./question-information-dialog.component.scss']
})
export class QuestionInformationDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {content: CStatement, imagePath: string}) {}

  ngOnInit() {
  }

}
