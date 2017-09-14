import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../common/material/material.module';
import { DatepickerModule } from '../common/datepicker/datepicker.module';
import { MatchesModule } from '../common/matches/matches.module';
import { GamesComponent } from './games.component';

@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule, DatepickerModule, MatchesModule],
  providers: [],
  declarations: [
    GamesComponent
  ]
})

export class GamesModule {}