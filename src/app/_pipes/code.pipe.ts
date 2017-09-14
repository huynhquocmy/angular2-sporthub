
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'myCode' })

export class CodePipe implements PipeTransform {
  transform(code: number) {
    let text = '';
    if (code === 200) {
      text = 'Thành công.';
    } else if (code === 3005) {
      text = 'Mã xác nhận không đúng.'
    } else if (code === 2003) {
      text = 'Email đã tồn tại.';
    } else if (code === 2005) {
      text = 'Vui lòng cung cấp đầy đủ thông tin.';
    } else if (code === 2004) {
      text = 'Số điện thoại đã tồn tại.';
    } else if (code === 3000) {
      text = 'Trận đấu không tìm thấy.';
    } else if (code === 2002) {
      text = 'Tên đăng nhập hoặc mật khẩu không đúng.';
    } else if (code === 2004) {
      text = 'Tên người dùng đã tồn tại.';
    } else if (code === 2000) {
      text = 'Không tìm thấy người dùng.';
    } else if (code === 500) {
      text = 'Lỗi server (Exception 500).';
    } else if (code === 600) {
      text = 'Dữ liệu bạn cung cấp không tồn tại.';
    } else if (code === 100) {
      text = 'Mã xác nhận gồm 6 ký tự.';
    } else if (code === 101) {
      text = 'Mật khẩu lặp lại không trùng khớp.';
    } else if (code === 102) {
      text = 'Vui lòng cung cấp đầy đủ thông tin bắt buộc (*).';
    } else {
      text = '';
    }
    return text;
  }
}
