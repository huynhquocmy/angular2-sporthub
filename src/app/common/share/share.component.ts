import { Component, Input } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})

export class ShareComponent implements AfterViewInit {

  @Input() match: any;

  shareUrl: any;
  constructor(private router: Router) {}
  ngAfterViewInit() {
    this.shareUrl = "https://www.facebook.com/sharer/sharer.php?u=https://sporthub.vn/game/"+ this.match.id +"&amp;title=Hãy tham gia nào";
  }
}
