import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { MaterialModule } from '../common/material/material.module';
import { AdminComponent } from './admin.component';
import { AdminService } from './admin.service';
import { PipesModule } from '../_pipes/pipes.module';
import { GooglePlaceModule } from '../common/map/map.module';
import { TipModule } from '../common/tip/tip.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    MomentModule,
    PipesModule,
    TipModule,
    GooglePlaceModule
  ],
  declarations: [AdminComponent],
  providers: [AdminService]
})

export class AdminModule {}
