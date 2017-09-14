import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { DatepickerModule } from '../datepicker/datepicker.module';
import { MatchesComponent } from './matches.component';
import { MatchesService } from './matches.service';
import { PipesModule } from '../../_pipes/pipes.module';

@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule, DatepickerModule, PipesModule],
  providers: [MatchesService],
  declarations: [
    MatchesComponent
  ],
  exports: [MatchesComponent]
})

export class MatchesModule {}