import { Component, AfterViewInit, Input } from '@angular/core';
import { SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppConstants } from '../../app.constants';
import { UploadService } from '../../_services/upload.service';
import { CommonService } from '../../_services/common.service';
import { UserService } from '../../_services/user.service';

declare var _: any;
declare var moment: any;
declare var $: any;

@Component({
  selector: 'Section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})

export class SectionComponent implements AfterViewInit {
  user: any;
  imgURI = AppConstants.imgURI;
  embed: string = '';
  @Input() item: any;
  @Input() callback: any;

  constructor(
    private _commonService: CommonService,
    private userService: UserService,
    private uploadService: UploadService,
    private router: Router) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe((user: any) => {
      if (user) {
        this.user = user;
      }
    });
  }

  upload(event: any) {
    let file = event.target.files[0];
    this.uploadService.upload(file)
    .subscribe((res: any) => {
      if (res.code === 200) {
        this.item.url = res.data;
        this.callback(this.item);
      }
    });
  }

  ngAfterViewInit() {
    if (this.item.type === 'text') {
      $('#item-' + this.item.id).html(this.item.value);
    }
    if (this.item.type === 'video') {
      this.embed = this.item.url;
    }
  }
}
