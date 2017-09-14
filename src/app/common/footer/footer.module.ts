import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule }  from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { FooterComponent } from './footer.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    FooterComponent
  ],
  providers: [],
  exports: [FooterComponent]
})

export class FooterModule {}
