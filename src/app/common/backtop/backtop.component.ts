import { HostListener, Component } from '@angular/core';
@Component({
  // moduleId: module.id,
  selector: 'backtop',
  templateUrl: './backtop.component.html',
  styleUrls: ['./backtop.component.css']
})

export class BacktopComponent {
  point: number = 0;
  @HostListener('window:scroll', ['$event'])
    track() {
          this.point = window.pageYOffset;
      }
  backToTop() {
    window.scrollTo(0, 0);
  }
}
