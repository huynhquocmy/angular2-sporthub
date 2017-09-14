import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
@Component({
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})

export class AlertPopupComponent {
  message: any;
  constructor(
    private dialogRef: MdDialogRef<any>) {}

  close() {
    this.dialogRef.close();
    if (this.message.callback) {
      this.message.callback();
    }
  }

  closeSilent() {
    this.dialogRef.close();
  }

  yes() {
  	this.message.callback();
  	this.dialogRef.close();
  }
}
