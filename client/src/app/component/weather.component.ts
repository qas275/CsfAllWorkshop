import { Component, OnInit, } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../service/weather.service';
import { weather } from '../models';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit{
  constructor(private activatedroute: ActivatedRoute, private wSvc:WeatherService){

  }

  weather= new weather("",0,"",0);

  ngOnInit(): void {
    const city = this.activatedroute.snapshot.params['city'];
    lastValueFrom(this.wSvc.searchWeather(city)).then(
      (weatherP) => {
        console.log(weatherP);
        let r = JSON.parse(JSON.stringify(weatherP));
        console.log(r.weather[0].description)
        this.weather.description = r.weather[0].description
        this.weather.id = r.id;
        this.weather.name = r.name; 
        this.weather.temp = r.main.temp; 
        console.log(this.weather.description)
      }
    )
  }

  


}
