import { NgModule } from '@angular/core';
import { AlertService } from './alert.service';
import { AlertComponent } from './alert.component';
import { BrowserModule }  from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { AlertPopupComponent } from './alert-popup.component';

@NgModule( {
  imports: [
    BrowserModule,
    MaterialModule
  ],
  declarations: [
    AlertComponent,
    AlertPopupComponent
  ],
  providers: [
    AlertService
  ],
  entryComponents: [AlertPopupComponent],
  exports: [AlertComponent]
})

export class AlertModule {}