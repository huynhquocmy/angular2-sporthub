
import { Pipe, PipeTransform } from '@angular/core';
import { CommonService } from '../_services/common.service';
declare var _: any;

@Pipe({ name: 'myStatus' })

export class StatusPipe implements PipeTransform {
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
    let status = _.find(info.matchesStatus, (sta: any) => {
      return sta.id === id;
    });
    return status.name;
  }
}
