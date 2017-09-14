import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../common/material/material.module';
import { PipesModule } from '../../_pipes/pipes.module';
import { UserCommentsModule } from '../../common/user-comments/user-comments.module';
import { ShareModule } from '../../common/share/share.module';

import { GameComponent } from './game.component';
// import { AgmCoreModule } from 'angular2-google-maps/core';
import { MatchService } from './game.service';

// import { SignupModule } from '../../signup/signup.module';
import { OtpComponent } from '../../signup/otp.component';

@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule, UserCommentsModule, PipesModule, ShareModule],
  providers: [MatchService],
  declarations: [
    GameComponent
  ],
  entryComponents: [ OtpComponent ],
})

export class GameModule {}