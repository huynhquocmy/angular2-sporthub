import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';
import { GameComponent } from './games/game/game.component';
import { GamesComponent } from './games/games.component';
import { HostComponent } from './host/host.component';
import { YourgamesComponent } from './yourgames/yourgames.component';
import { AdminComponent } from './admin/admin.component';
import { RequestComponent } from './request/request.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ProfileGeneralComponent } from './profile/general/general.component';
import { ProfileBankComponent } from './profile/bank/bank.component';
import { ProfileAccountComponent } from './profile/account/account.component';
import { ProjectComponent } from './builder/project/project.component';
import { PageComponent } from './builder/page/page.component';
import { NewsComponent } from './news/news.component';
import { ArticleComponent } from './news/article/article.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [{
      path: 'general',
      component: ProfileGeneralComponent
    }, {
      path: 'bank',
      component: ProfileBankComponent
    }, {
      path: 'account',
      component: ProfileAccountComponent
    }]
  },
  { path: 'user/:userid', component: UserComponent },
  { path: 'game/:gameid', component: GameComponent },
  { path: 'games', component: GamesComponent, children: [{path: 'game/:gameid', component: GameComponent}] },
  { path: 'host-game', component: HostComponent},
  { path: 'edit-game/:gameid', component: HostComponent },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'your-games', component: YourgamesComponent },
  { path: 'admin-ccc', component: AdminComponent },
  { path: 'request', component: RequestComponent },
  { path: 'aboutus', component: AboutusComponent },
  {
    path: 'project',
    component: ProjectComponent,
    children: [{
      path: 'page/:pageid',
      component: PageComponent
    }, {
      path: 'new',
      component: PageComponent
    }]
  },
  {
    path: 'news',
    component: NewsComponent,
    children: [{
      path: 'article/:pageid',
      component: ArticleComponent
    }]
  },
  { path: '**', redirectTo: '/'}
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule {}
