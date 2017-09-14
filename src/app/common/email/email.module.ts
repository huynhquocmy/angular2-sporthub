import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { EmailComponent } from './email.component';

@NgModule({
  imports: [BrowserModule, MaterialModule, FormsModule],
  providers: [],
  declarations: [
    EmailComponent
  ],
  exports: [EmailComponent]
})

export class EmailModule {}