import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../common/material/material.module';
import { SignupService } from './signup.service';
import { SignupComponent } from './signup.component';
import { OtpComponent } from './otp.component';
import { PipesModule } from '../_pipes/pipes.module';

@NgModule({
  declarations: [SignupComponent, OtpComponent],
  exports: [SignupComponent, OtpComponent],
  providers: [SignupService],
  imports: [
    MaterialModule,
    BrowserModule,
    FormsModule,
    PipesModule
  ]
})
export class SignupModule {}

