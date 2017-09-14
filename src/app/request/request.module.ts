import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../common/material/material.module';
import { RequestService } from './request.service';
import { RequestComponent } from './request.component';
import { PipesModule } from '../_pipes/pipes.module';
@NgModule({
  declarations: [RequestComponent],
  exports: [RequestComponent],
  providers: [RequestService],
  imports: [
    MaterialModule,
    BrowserModule,
    FormsModule,
    PipesModule
  ]
})
export class RequestModule {}

