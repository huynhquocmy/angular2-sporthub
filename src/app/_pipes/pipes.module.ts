import { NgModule } from '@angular/core';
import { TimeRangePipe } from './pipes.pipe';
import { StatusPipe } from './status.pipe';
import { FromNowPipe } from './fromnow.pipe';
import { CodePipe } from './code.pipe';
import { LevelPipe } from './level.pipe';
import { NamePipe } from './name.pipe';
import { SafePipe } from './safe.pipe';

@NgModule( {
  imports: [],
  declarations: [TimeRangePipe, StatusPipe, FromNowPipe, CodePipe, LevelPipe, NamePipe, SafePipe],
  providers: [TimeRangePipe, StatusPipe, FromNowPipe, CodePipe, LevelPipe, NamePipe, SafePipe],
  exports: [TimeRangePipe, StatusPipe, FromNowPipe, CodePipe, LevelPipe, NamePipe, SafePipe]
})

export class PipesModule {}
