import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { TipComponent } from './tip.component';

@NgModule({
  imports: [BrowserModule, MaterialModule],
  providers: [],
  declarations: [
    TipComponent
  ],
  exports: [TipComponent]
})

export class TipModule {}