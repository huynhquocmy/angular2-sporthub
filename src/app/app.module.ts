import { NgModule }       from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { FormsModule }    from '@angular/forms';
import { MaterialModule } from './common/material/material.module';
import { AppComponent }     from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BacktopModule } from './common/backtop/backtop.module';

import { HttpService } from './_services/http.service';
import { UserService } from './_services/user.service';
import { AlertModule } from './common/alert/alert.module';
import { LangModule } from './_lang/lang.module';

import { NewsModule } from './news/news.module';
import { ProjectModule } from './builder/project/project.module';
import { HeaderModule } from './common/header/header.module';
import { AboutusModule } from './aboutus/aboutus.module';
import { FooterModule } from './common/footer/footer.module';
import { HomeModule } from './home/home.module';
import { GameModule } from './games/game/game.module';
import { GamesModule } from './games/games.module';
import { HostModule } from './host/host.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { enableProdMode } from '@angular/core';
import { MatchesModule } from './common/matches/matches.module';
import { CommentsModule } from './common/comments/comments.module';
import { UserCommentsModule } from './common/user-comments/user-comments.module';
import { YourgamesModule } from './yourgames/yourgames.module';
import { AdminModule } from './admin/admin.module';
import { RequestModule } from './request/request.module';
import { CacheService } from './_services/cache.service';
import { IntroModule } from './common/intro/intro.module';
import { EmailModule } from './common/email/email.module';
import { TipModule } from './common/tip/tip.module';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from './_environment/environment';

enableProdMode();

@NgModule({
  imports: [
    // system modules
    JsonpModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),

    MaterialModule,
    BacktopModule,
    IntroModule,
    EmailModule,
    TipModule,

    // common modules
    MatchesModule,
    CommentsModule,
    UserCommentsModule,

    NewsModule,
    ProjectModule,
    HeaderModule,
    FooterModule,
    AlertModule,
    LangModule,

    // feture modules
    HomeModule,
    GamesModule,
    GameModule,
    HostModule,
    ProfileModule,
    UserModule,
    YourgamesModule,
    AdminModule,
    RequestModule,
    AboutusModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [ HttpService, UserService, CacheService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
