import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../common/material/material.module';
import { RouterModule } from '@angular/router'
import { SectionComponent } from './section.component';
import { PipesModule } from '../../_pipes/pipes.module';

@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule, RouterModule, PipesModule],
  providers: [],
  declarations: [
    SectionComponent
  ],
  exports: [SectionComponent]
})

export class SectionModule {}
