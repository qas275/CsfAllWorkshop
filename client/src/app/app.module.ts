import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CityComponent } from './component/city.component';
import { WeatherComponent } from './component/weather.component';

const routes :Routes =[
  {path: '', component:CityComponent},
  {path: 'city', component:CityComponent},
  {path: 'search/:city', component:WeatherComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, ReactiveFormsModule, RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
