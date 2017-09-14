import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../common/material/material.module';
import { DatepickerModule } from '../common/datepicker/datepicker.module';
import { RouterModule } from '@angular/router';
import { MatchesModule } from '../common/matches/matches.module';
import { HomeComponent } from './home.component';
import { CommonService } from '../_services/common.service';
import { HomeService } from './home.service';
import { UserService } from '../_services/user.service';
import { PipesModule } from '../_pipes/pipes.module';

@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule, DatepickerModule, MatchesModule, RouterModule, PipesModule],
  providers: [CommonService, HomeService, UserService],
  declarations: [
    HomeComponent
  ]
})

export class HomeModule {}
