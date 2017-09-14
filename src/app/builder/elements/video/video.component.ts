import { Component, AfterViewInit, Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';

declare var _: any;
declare var $: any;

@Component({
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})

export class VideoComponent implements AfterViewInit {
  url: string;

  constructor(
    private dialogRef: MdDialogRef<any>,
    private router: Router) {
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (!this.url) {
      return;
    }
    if (this.url.indexOf('embed') < 0) {
        if (this.url.indexOf('?v=') > -1) {
          let version, url;
          version = this.url.split('?v=')[1];
          version = version.split('&')[0];
          url = 'https://www.youtube.com/embed/' + version;
          this.url = url;
        }
    }
    this.dialogRef.close(this.url);
  }

  ngAfterViewInit() {
  }
}
