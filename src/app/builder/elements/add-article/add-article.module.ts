import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../common/material/material.module';
import { RouterModule } from '@angular/router';
import { AddArticleComponent } from './add-article.component';

@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule, RouterModule],
  providers: [],
  declarations: [
    AddArticleComponent
  ],
  exports: [AddArticleComponent],
  entryComponents: [AddArticleComponent],
})

export class AddArticleModule {}
