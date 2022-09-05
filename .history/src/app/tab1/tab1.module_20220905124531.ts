import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { PopoverComponent } from '../popover/popover.component';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    GoogleMapsModule, //
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [Tab1Page, PopoverComponent],
  providers: [ Geolocation, BackgroundGeolocation,NativeGeocoder]
})
export class Tab1PageModule {}
