import { IonicModule } from '@ionic/angular';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { PopoverComponent } from '../popover/popover.component';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: '',
      libraries: ['places']
    }),],
  schemas: [NO_ERRORS_SCHEMA],

  declarations: [Tab1Page, PopoverComponent],
  providers: [ Geolocation, BackgroundGeolocation,NativeGeocoder,
  ]
})
export class Tab1PageModule {}
