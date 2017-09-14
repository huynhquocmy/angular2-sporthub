import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ContenttoolService } from '../../_services/contenttool.service';
import { MaterialModule } from '../../common/material/material.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../_pipes/pipes.module';
import { ArticleComponent } from './article.component';

@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule, RouterModule, PipesModule],
  providers: [ContenttoolService],
  declarations: [
    ArticleComponent
  ]
})

export class ArticleModule {}
