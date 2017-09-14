import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../common/material/material.module';
import { RouterModule } from '@angular/router';
import { ArticleModule } from './article/article.module';
import { NewsComponent } from './news.component';
import { PipesModule } from '../_pipes/pipes.module';

@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule, RouterModule, PipesModule, ArticleModule],
  providers: [],
  declarations: [
    NewsComponent
  ]
})

export class NewsModule {}
