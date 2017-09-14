import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { UserCommentsComponent } from './user-comments.component';
import { PipesModule } from '../../_pipes/pipes.module';
import { UserCommentsService } from './user-comments.service';

@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule, PipesModule],
  providers: [UserCommentsService],
  declarations: [
    UserCommentsComponent
  ],
  exports: [UserCommentsComponent]
})

export class UserCommentsModule {}
