
import { Pipe, PipeTransform } from '@angular/core';
import { CommonService } from '../_services/common.service';
declare var _: any;

@Pipe({ name: 'myLevel' })

export class LevelPipe implements PipeTransform {
  info: any;
  constructor(private _commonService: CommonService) {
    this.getInfo();
  }

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    // general info
    this._commonService.getInfo()
    .subscribe(
      (res: any) => {
        this.info = res.data;
      }
     );
    /* end general info*/
  }

  transform(id: number) {
    let info = this.info;

    if (!info) {
      return '';
    }
    let data = _.find(info.gameLevels, (item: any) => {
      return item.id === id;
    });
    return data.name;
  }
}
