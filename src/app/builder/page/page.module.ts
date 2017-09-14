import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ContenttoolService } from '../../_services/contenttool.service';
import { MaterialModule } from '../../common/material/material.module';
import { RouterModule } from '@angular/router';
import { SectionModule } from '../section/section.module';
import { VideoModule } from '../elements/video/video.module';
import { PageComponent } from './page.component';

@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule, RouterModule, SectionModule, VideoModule],
  providers: [ContenttoolService],
  declarations: [
    PageComponent
  ]
})

export class PageModule {}
