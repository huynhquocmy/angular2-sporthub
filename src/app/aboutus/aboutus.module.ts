import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../common/material/material.module';
import { AboutusComponent } from './aboutus.component';
@NgModule({
  declarations: [AboutusComponent],
  exports: [AboutusComponent],
  providers: [],
  imports: [
    MaterialModule,
    BrowserModule,
    FormsModule
  ]
})
export class AboutusModule {}

