import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { UserComponent } from './user.component';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../common/material/material.module';
import { AccountService } from './user.service';
import { CommentsModule } from '../common/comments/comments.module';
import { PipesModule } from '../_pipes/pipes.module';
import { PolygonModule } from '../common/polygon/polygon.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    CommentsModule,
    PipesModule,
    PolygonModule
  ],
  declarations: [
    UserComponent
  ],
  providers: [AccountService],
  exports: [UserComponent]
})
export class UserModule {}