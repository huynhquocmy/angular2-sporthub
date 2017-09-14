import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginService }   from './login.service';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../common/material/material.module';
import { PipesModule } from '../_pipes/pipes.module';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    PipesModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [LoginComponent],
  providers: [LoginService]
})
export class LoginModule {}