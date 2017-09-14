import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})

export class IntroComponent implements AfterViewInit {

  constructor(private router: Router) {}

  finishIntro() {
    localStorage.setItem('introduced', 'true');
    // this.router.navigate(['/games']);
    $('.intro').remove();
  }
  ngAfterViewInit() {
  }
}
