import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { IntroComponent } from './intro.component';

@NgModule({
  imports: [BrowserModule, MaterialModule],
  providers: [],
  declarations: [
    IntroComponent
  ],
  exports: [IntroComponent]
})

export class IntroModule {}