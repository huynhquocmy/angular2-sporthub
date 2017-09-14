import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { ProfileAccountComponent } from './account.component';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../../common/material/material.module';
import { UploadService } from '../../_services/upload.service';
import { ProfileAccountService } from './account.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    ProfileAccountComponent
  ],
  providers: [UploadService, ProfileAccountService],
  exports: [ProfileAccountComponent]
})
export class ProfileAccountModule {}
