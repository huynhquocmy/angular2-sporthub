import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../_services/upload.service';
import { ProfileAccountService } from './account.service';
import { AppConstants } from '../../app.constants';
import { UserService } from '../../_services/user.service';

@Component({
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
    providers: [  ]
})
export class ProfileAccountComponent implements OnInit {
  user: any = {};
  loading = false;
  returnUrl: string;
  imgURI = AppConstants.imgURI;
  isPassword = false;
  error = '';
  success = '';

  constructor (
    private userService: UserService,
    private uploadService: UploadService,
    private profileAccountService: ProfileAccountService) {
    let user = localStorage.getItem('user');
    this.user = JSON.parse(user);
  }

  upload(event: any) {
    let file = event.target.files[0];
    this.uploadService.upload(file)
    .subscribe((res: any) => {
      if (res.code === 200) {
        this.user.avatar = res.data;
        // this.update();
      }
    });
  }

  update() {

    if (this.user.password && !this.user.newPassword ||
      this.user.newPassword && !this.user.password) {
      this.error = "Vui lòng điền đầy đủ thông tin cập nhật.";
      return;
    }

    if ((this.user.newPassword || this.user.newPasswordAgain) && this.user.newPassword !== this.user.newPasswordAgain) {
      this.error = "Mật khẩu mới và mật khẩu xác nhận không trùng khớp.";
      return;
    }

    if (!this.user.fullName || !this.user.mobile) {
      this.error = 'Vui lòng nhập đầy đủ thông tin bắt buộc ở trên (*).';
      return;
    }
    this.error = '';
    this.loading = true;
    this.profileAccountService.update(this.user)
    .subscribe((res: any) => {
      this.loading = false;

      if (res.code !== 200) {
        this.error = 'Thông tin cập nhật không hợp lệ.'
        return;
      }

      this.user.password = this.user.newPassword = this.user.newPasswordAgain = '';
      this.isPassword = false;
      localStorage.setItem('user', JSON.stringify(this.user));
      this.userService.setUser(this.user);
      this.success = 'Cập nhật thông tin thành công.';

      setTimeout(() => {
        this.success = '';
      }, 2000);
    });
  }

  ngOnInit() {
  }
}
