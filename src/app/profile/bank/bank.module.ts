import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { ProfileBankComponent } from './bank.component';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../../common/material/material.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    ProfileBankComponent
  ],
  exports: [ProfileBankComponent]
})
export class ProfileBankModule {}
