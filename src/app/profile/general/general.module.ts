import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { ProfileGeneralComponent } from './general.component';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../../common/material/material.module';
import { CommentsModule } from '../../common/comments/comments.module';
import { PipesModule } from '../../_pipes/pipes.module';
import { PolygonModule } from '../../common/polygon/polygon.module';

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
    ProfileGeneralComponent
  ],
  exports: [ProfileGeneralComponent]
})
export class ProfileGeneralModule {}
