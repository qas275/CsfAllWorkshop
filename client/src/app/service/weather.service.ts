import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import Dexie from 'dexie';
import { citiesTable } from '../models';

@Injectable({
  providedIn: 'root'
})
export class WeatherService extends Dexie{

  cityTable:Dexie.Table<citiesTable, string>

  constructor(private http: HttpClient) {
    super('cityDB')
    this.version(1).stores({
      citiesTable:'index' //table name here must match below!!!
    });
    this.cityTable = this.table('citiesTable') //table name here must match table name above!!!
  }

  async updateDexie(cities: citiesTable){
    const v = await this.cityTable?.put(cities);
    console.log(v);
  }

  async getDexie(): Promise<citiesTable[]>{
    console.log("ASDASD")
    const table:citiesTable[] = await this.cityTable.toArray();
    return table;
  }

  searchWeather(city:string){
    const params = new HttpParams().set("q",city).set("appid", "0045b80dc8bbeb63dd27906ebdd99fe1")
    return this.http.get('https://api.openweathermap.org/data/2.5/weather',{params: params});
  }
}
