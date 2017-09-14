import { Component } from '@angular/core';

@Component({
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})

export class AboutusComponent {
  model: any = {};
  error: number;
  verified = false;
  loading = false;

  constructor () {}
}
