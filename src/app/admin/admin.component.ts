import { Component } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { AdminService } from './admin.service';
import { AlertService } from '../common/alert/alert.service';

declare var google: any;
@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})

export class AdminComponent {
  user: any;
  error = '';
  options: any = {};
  locations: Array<any>;
  map: any;
  model: any = {
    latitude: 0,
    longitude: 0,
    zoom: 17
  };

  constructor(private _commonService: CommonService,
    private adminService: AdminService,
    private alertService: AlertService,) {
  }

  getInfo() {
    // general info
    this._commonService.getInfo()
    .subscribe(
       (res: any) => {
         this.locations = res.data.locations;
       }
     );
    /* end general info*/
  }

  initMapDebounce() {
    setTimeout(() => {
      this.initMap();
    }, 1000);
  }

  initMap() {
    let mapDiv = document.getElementById('admin-map');
    let lat = Number(this.model.latitude),
        lng = Number(this.model.longitude);
    let latlng = new google.maps.LatLng(lat, lng);

    this.options = {
        scrollwheel: false,
        scaleControl: false,
        // draggable: false,
        center: new google.maps.LatLng(this.model.latitude, this.model.longitude),
        zoom: this.model.zoom,
        MapTypeId: google.maps.MapTypeId.TERRAIN
    };
    this.map = new google.maps.Map(mapDiv, this.options);
    let marker = new google.maps.Marker({
      position: latlng,
      map: this.map,
      title: this.model.address
    });
  }

  ngOnInit() {
    this.getInfo();
    this.initMap();
  }

  getAddress(place:Object) {
    this.model.address = place['formatted_address'];
    var location = place['geometry']['location'];
    var lat =  location.lat();
    var lng = location.lng();
    this.model.latitude = lat;
    this.model.longitude = lng;
    this.initMap();
  }

  save() {
    this.error = '';
    if (!this.model.name || !this.model.address || !this.model.locationId) {
      this.error = 'Vui lòng nhập đầy đủ thông tin bắt buộc ở trên (*).';
      return;
    }
    this.adminService.save(this.model)
    .subscribe(
      (res: any) => {
        if (res.code === 200) {
          this.alertService.alert({
            content: 'Tạo sân thành công, xin cảm ơn !'
          }, null);
        }
      });
  }

  ngAfterViewInit() {
  }
}
