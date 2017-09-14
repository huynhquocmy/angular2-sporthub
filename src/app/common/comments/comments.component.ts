import { Component, Input } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { AppConstants } from '../../app.constants';
import { Router, ActivatedRoute } from '@angular/router';

declare var _: any;
@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements AfterViewInit {

  @Input() reviews:Array<any>;
  @Input() type: string;

  loading = false;
  imgURI = AppConstants.imgURI;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnChanges() {
    _.each(this.reviews, (review: any) => {
      review.rating = review.rating || review.matchRating;
    });
  }

  selectUser(userid: string) {
    this.router.navigate(['user', userid]);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {}
}
