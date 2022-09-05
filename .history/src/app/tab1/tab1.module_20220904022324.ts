import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { PopoverComponent } from '../popover/popover.component';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [Tab1Page, PopoverComponent],
  providers: [ Geolocation, BackgroundGeolocation,NativeGeocoder]
})
export class Tab1PageModule {}
