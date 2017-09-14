import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { MaterialModule } from '../common/material/material.module';
import { DatepickerModule } from '../common/datepicker/datepicker.module';
import { HostComponent } from './host.component';
import { HostService } from './host.service';
import { TipModule } from '../common/tip/tip.module';

@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule, DatepickerModule, MomentModule, TipModule],
  providers: [HostService],
  declarations: [
    HostComponent
  ]
})

export class HostModule {}
