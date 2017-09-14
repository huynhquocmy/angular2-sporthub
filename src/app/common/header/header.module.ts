import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule }  from '@angular/platform-browser';
import { SignupModule } from '../../signup/signup.module';
import { SignupComponent } from '../../signup/signup.component';
import { OtpComponent } from '../../signup/otp.component';
import { LoginModule } from '../../login/login.module';
import { LoginComponent } from '../../login/login.component';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './header.component';
import { HeaderService } from './header.service';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    MaterialModule,
    SignupModule,
    LoginModule
  ],
  declarations: [
    HeaderComponent
  ],
  entryComponents: [ SignupComponent, LoginComponent, OtpComponent ],
  providers: [HeaderService],
  exports: [HeaderComponent]
})

export class HeaderModule {}
