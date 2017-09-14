import { NgModule } from '@angular/core';
import { PolygonComponent } from './polygon.component';
import { BrowserModule }  from '@angular/platform-browser';

@NgModule( {
  imports: [
    BrowserModule
  ],
  declarations: [
    PolygonComponent
  ],
  providers: [
  ],
  exports: [PolygonComponent]
})

export class PolygonModule {}