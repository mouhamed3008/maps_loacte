/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prefer-const */
/* eslint-disable curly */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import SwiperCore, { SwiperOptions, Autoplay, Pagination } from 'swiper';
import { PopoverComponent } from '../popover/popover.component';
import { GlobalService } from '../services/global.service';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Marker } from '@capacitor/google-maps';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  loc = 'Locating...';
  banners: any[] = [];
  categories: any[] = [];
  favorites: any[] = [];
  offers: any[] = [];
  nearby: any[] = [];

  bannerConfig: SwiperOptions;
  categoryConfig: SwiperOptions;
  restaurantConfig: SwiperOptions;

  constructor(
    public popoverController: PopoverController,
    private global: GlobalService,
    private nativeGeocoder: NativeGeocoder
  ) { }

  ngOnInit() {

    this.getCurrentLocation();
  }


  ionViewDidEnter() {
    this.createMap();
  }

  async createMap() {
    this.map = await GoogleMap.create({

    id: 'my-map',
    apiKey: 'AIzaSyDuxjWtjQDXXZz0tKBjEO3JN--9NIH45Co',
    element: this.mapRef.nativeElement,
    config: {
      center: {
        lat: 33.6,
        lng: -117.9
      },
      zoom: 10,
    }
    });
    this.addMarkers();
  }


  async addMarkers(){
  const markers: Marker[] = [
    {
      coordinate: {
        lat: 33.7,
        lng: -117.2
      },
      title: "Localhost",
      snippet: "Best palce"
    }
  ];
  this.map.addMarkers( markers);
  }


  ngAfterContentChecked() {
    this.bannerConfig = {
      slidesPerView: 1.2,
      spaceBetween: 10,
      centeredSlides: true,
      initialSlide: this.banners?.length > 1 ? 1 : 0,
      autoplay: {
        delay: 3000
      },
      pagination: { clickable: true }
    };
    this.categoryConfig = {
      slidesPerView: 3.5
    };
    this.restaurantConfig = {
      slidesPerView: 1.1
    };
  }

  async getCurrentLocation() {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
  };

    try {
      const coordinates = await this.global.getCurrentLocation();
      console.log('Current positions:', coordinates);
      this.nativeGeocoder.reverseGeocode(coordinates.coords.latitude, coordinates.coords.longitude, options)
      .then((result: NativeGeocoderResult[]) => console.log('Current:', JSON.stringify(result[0])))
      .catch((error: any) => console.log(error));
    } catch(e) {
      console.log(e);
      this.openPopover();
    }
  }

  openPopover() {
    const ev = {
      target: {
        getBoundingClientRect: () => {
          return {
            left: 5
          };
        }
      }
    };
    this.presentPopover(ev);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'custom-popover',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with data', data);
    if(data) {
      this.enableLocation();
    } else {
      this.loc = 'Karol Bagh, Delhi';
    }
  }

  async enableLocation() {
    try {
      const status = await this.global.requestLocationPermission();
      console.log(status);
      if(status?.location === 'granted') {
        // const stat = await this.global.enableLocation();
        // if(stat) {
        //   const coordinates = await this.global.getCurrentLocation();
        //   console.log(coordinates);
        // }
      }
    } catch(e) {
      console.log(e);
    }
  }

  async requestGeolocationPermission() {
    try {
      const status = await this.global.requestLocationPermission();
      console.log(status);
      if(status?.location === 'granted') this.getCurrentLocation();
      else this.loc = 'Karol Bagh, Delhi';
    } catch(e) {
      console.log(e);
    }
  }




}
