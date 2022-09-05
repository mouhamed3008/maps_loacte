/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prefer-const */
/* eslint-disable curly */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonModal, PopoverController } from '@ionic/angular';
import SwiperCore, { SwiperOptions, Autoplay, Pagination } from 'swiper';
import { PopoverComponent } from '../popover/popover.component';
import { GlobalService } from '../services/global.service';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { OverlayEventDetail } from '@ionic/core/components';
import {
  MapInfoWindow,
  MapGeocoder,
  MapGeocoderResponse,
} from '@angular/google-maps';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  loc = 'Locating...';
  banners: any[] = [];

  nearby: any[] = [];
  latitude: number;
  longitude: number;
  address = '';
  zoom = 12;
  @ViewChild('map')mapRef: ElementRef;
  map: GoogleMap;


  bannerConfig: SwiperOptions;
  categoryConfig: SwiperOptions;
  restaurantConfig: SwiperOptions;

  @ViewChild(IonModal) modal: IonModal;

  name: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  constructor(
    public popoverController: PopoverController,
    private global: GlobalService,
    private nativeGeocoder: NativeGeocoder,
    private geoCoder: MapGeocoder
  ) { }

  ngOnInit() {

    this.getCurrentLocation();
  }





  async addMarkers(lati: any, longi: any){
  const markers: Marker[] = [
    {
      coordinate: {
        lat: lati,
        lng: longi
      },
      title: "Localhost",
      snippet: "Best palce",

    }
  ];

  this.map.addMarkers( markers);
  this.getAddress(lati, longi);
  this.map.setOnMarkerClickListener(()=>{
    this.setOpen(true);
  });
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
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
       this.nativeGeocoder.reverseGeocode(coordinates.coords.latitude, coordinates.coords.longitude, options)
       .then((result: NativeGeocoderResult[]) => console.log('Current:', JSON.stringify(result[0].countryName)))
       .catch((error: any) => console.log(error));

      this.map = await GoogleMap.create({

        id: 'my-map',
        apiKey: 'AIzaSyDuxjWtjQDXXZz0tKBjEO3JN--9NIH45Co',
        element: this.mapRef.nativeElement,
        config: {
          center: {
            lat: coordinates.coords.latitude,
            lng: coordinates.coords.longitude
          },
          zoom: 15,
        }
        });
        this.addMarkers(coordinates.coords.latitude,coordinates.coords.longitude);
    } catch(e) {
      console.log(e);

    }
  }




  getAddress(latitude: any, longitude: any) {
    this.geoCoder
      .geocode({ location: { lat: latitude, lng: longitude } })
      .subscribe((addr: MapGeocoderResponse) => {
        if (addr.status === 'OK') {
          if (addr.results[0]) {
            this.zoom = 10;
            this.address = addr.results[0].formatted_address;
            console.log(this.address);

          } else {
            this.address = null;
            window.alert('No results found');
          }
        } else {
          this.address = null;
          window.alert('Geocoder failed due to: ' + addr.status);
        }
      });
  }

}
