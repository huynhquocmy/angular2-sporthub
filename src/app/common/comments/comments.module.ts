import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { CommentsComponent } from './comments.component';
import { PipesModule } from '../../_pipes/pipes.module';

@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule, PipesModule],
  providers: [],
  declarations: [
    CommentsComponent
  ],
  exports: [CommentsComponent]
})

export class CommentsModule {}
