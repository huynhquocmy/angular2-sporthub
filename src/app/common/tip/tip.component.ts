import { Component, Input } from '@angular/core';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.css']
})

export class TipComponent implements AfterViewInit {

  @Input() type: any;

  constructor() {}

  show = false;
  message = '';

  getMessage() {
    switch (this.type) {
      case 1: {
        this.message = 'Nếu thời gian trước khi trận đấu diễn ra nằm trong khoản thời gian đóng, bạn không thể hủy trận đấu hoặc thay đổi thông tin.';
        break;
      }
      case 2: {
        this.message = 'Tự động hủy nếu không đủ người tham gia.';
        break;
      }
      case 3: {
        this.message = 'Đợn vị 1000 vnđ, ví dụ 200k bạn chỉ cần nhập 200.';
        return;
      }
      default: {
        this.message = '';
        break;
      }
    }
  }
  ngAfterViewInit() {
    this.getMessage();
  }
}
