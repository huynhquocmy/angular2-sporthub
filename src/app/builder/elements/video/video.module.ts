import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../common/material/material.module';
import { RouterModule } from '@angular/router';
import { VideoComponent } from './video.component';

@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule, RouterModule],
  providers: [],
  declarations: [
    VideoComponent
  ],
  exports: [VideoComponent],
  entryComponents: [VideoComponent],
})

export class VideoModule {}
