import { Component } from '@angular/core';
import { AlertService } from './alert.service';
import { MdDialog } from '@angular/material';
import { AlertPopupComponent } from './alert-popup.component';
@Component({
  // moduleId: module.id,
  selector: 'alert',
  template: '',
  styleUrls: ['./alert.component.css']
})

export class AlertComponent {
  message: any;
  dialogRef: any;
  constructor(
    private alertService: AlertService,
    private dialog: MdDialog) {}

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
      if (this.message && this.message.type === 'alert') {
        this.showAlert(this.message);
      }
      if (this.message && this.message.type === 'confirm') {
        this.showAlert(this.message);
      }
    });
  }

  showAlert(data: any) {
    this.dialogRef = this.dialog.open(AlertPopupComponent);
    this.dialogRef.componentInstance.message = data;
  }

  close() {
    this.dialogRef.close();
  }
}
