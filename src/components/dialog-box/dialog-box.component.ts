import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) { }

  ngOnInit() {
  }

}

export interface IDialogButton {
  text: string;
  value: any;
}

export interface IDialogData {
  message: string;
  button1?: IDialogButton;
  button2?: IDialogButton;
  button3?: IDialogButton;
}
