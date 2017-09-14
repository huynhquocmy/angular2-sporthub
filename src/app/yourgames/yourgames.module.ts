import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { MaterialModule } from '../common/material/material.module';
import { YourgamesComponent } from './yourgames.component';
import { YourgamesService } from './yourgames.service';
import { PipesModule } from '../_pipes/pipes.module';

@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule, MomentModule, PipesModule],
  declarations: [YourgamesComponent],
  providers: [YourgamesService]
})

export class YourgamesModule {}
