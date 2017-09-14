import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { ShareComponent } from './share.component';

@NgModule({
  imports: [BrowserModule, MaterialModule],
  providers: [],
  declarations: [
    ShareComponent
  ],
  exports: [ShareComponent]
})

export class ShareModule {}