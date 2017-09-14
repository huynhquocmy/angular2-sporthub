import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../common/material/material.module';
import { RouterModule } from '@angular/router';
import { PageModule } from '../page/page.module';
import { SectionModule } from '../section/section.module';
import { ProjectComponent } from './project.component';
import { ProjectService } from './project.service';
import { PipesModule } from '../../_pipes/pipes.module';
import { AddArticleModule } from '../elements/add-article/add-article.module';

@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule, RouterModule, PipesModule, PageModule, SectionModule, AddArticleModule],
  providers: [ProjectService],
  declarations: [
    ProjectComponent
  ]
})

export class ProjectModule {}
