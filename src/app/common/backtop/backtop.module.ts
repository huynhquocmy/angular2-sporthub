import { NgModule } from '@angular/core';
import { BacktopComponent } from './backtop.component';
import { BrowserModule }  from '@angular/platform-browser';

@NgModule( {
  imports: [
    BrowserModule
  ],
  declarations: [
    BacktopComponent
  ],
  providers: [
  ],
  exports: [BacktopComponent]
})

export class BacktopModule {}
