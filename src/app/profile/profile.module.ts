import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../common/material/material.module';
import { RouterModule } from '@angular/router';
import { ProfileGeneralModule } from './general/general.module';
import { ProfileBankModule } from './bank/bank.module';
import { ProfileAccountModule } from './account/account.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    ProfileGeneralModule,
    ProfileBankModule,
    ProfileAccountModule
  ],
  declarations: [
    ProfileComponent
  ],
  exports: [ProfileComponent]
})
export class ProfileModule {}
