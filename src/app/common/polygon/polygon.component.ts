import { Component, Input, SimpleChange } from '@angular/core';
@Component({
  selector: 'skills',
  templateUrl: './polygon.component.html',
  styleUrls: ['./polygon.component.css']
})

export class PolygonComponent {
  @Input() user: any;
  points = "";

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (this.user.skillRatings.length) {
      this.getPoints();
    } else {
      this.points = "";
    }
  }

  getPoints () {
    let data = [{
      xLength: 100,
      yLength: 100,
      rating: 4,
      xCoor: 100,
      yCoor: 0,
      type: 5
    }, {
      xLength: 100,
      yLength: 50,
      rating: 1,
      xCoor: 0,
      yCoor: 50,
      type: 1
    }, {
      xLength: 100,
      yLength: 50,
      rating: 2,
      xCoor: 0,
      yCoor: 150,
      type: 2
    }, {
      xLength: 100,
      yLength: 100,
      rating: 5,
      xCoor: 100,
      yCoor: 200,
      type: 6
    }, {
      xLength: 100,
      yLength: 50,
      rating: 4,
      xCoor: 200,
      yCoor: 150,
      type: 4
    }, {
      xLength: 100,
      yLength: 50,
      rating: 3,
      xCoor: 200,
      yCoor: 50,
      type: 3
    }];

    let str = '';
    let me = this;
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      item.rating = me.user.skillRatings[i].mark;
      str += this.xy(item.xLength, item.yLength, item.rating, item.xCoor, item.yCoor, item.type);
      if (i < data.length - 1) {
        str += ' ';
      }
    }

    this.points = str;
  }

  xy(xLength: any, yLength: any, rating: any, xCoor: any, yCoor: any, type: any) {
    // rating = 3;
    var lengthX = xLength*rating/5;
    var lengthY = yLength*rating/5;

    var gapX = xLength - lengthX;
    var gapY = yLength - lengthY;
    var valueX, valueY;

    switch (type) {
      case 1: {
        valueX = xCoor + gapX;
        valueY = yCoor + gapY;
        break;
      }
      case 2: {
        valueX = xCoor + gapX;
        valueY = yCoor - gapY;
        break;
      }
      case 3: {
        valueX = xCoor - gapX;
        valueY = yCoor + gapY;
        break;
      }
      case 4: {
        valueX = xCoor - gapX;
        valueY = yCoor - gapY;
        break;
      }
      case 5: {
        valueX = xCoor;
        valueY = yCoor + gapY;
        break;
      }
      case 6: {
        valueX = xCoor;
        valueY = yCoor - gapY;
        break;
      }
    }

    return valueX + "," + valueY;
  }

  ngOnInit() {
    // this.getPoints();
  }
}
