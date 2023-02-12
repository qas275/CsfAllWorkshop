import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WeatherService } from '../service/weather.service';
import { citiesTable } from '../models';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit{

  cities:Set<String> = new Set(['singapore', 'kuala lumpur', 'tokyo', 'bangkok', 'hong kong', 'beijing']);
  toSave: citiesTable = {
    index:'a',
    cities:[]
  };

  form!: FormGroup;

  constructor(private fb: FormBuilder, private wSvc:WeatherService){

  }

  ngOnInit(): void {
      this.form = this.createForm();
      this.wSvc.getDexie().then(v=>{
        console.log(v)
        if(v){
          const a = v[0];
          console.warn("Index exists!!!")
          this.cities = new Set(v[0].cities);
          return null;
        }else{
          console.log("NO EXISTING DB")
          this.cities =  new Set(['singapore', 'kuala lumpur', 'tokyo', 'bangkok', 'hong kong', 'beijing']);
          return null;
        }
      })
  }

  createForm(){
    return this.fb.group({
      city:this.fb.control('')
    })
  }

  add(){
    const input:string = this.form.controls['city'].value;
    this.cities.add(input.toLowerCase());
  }

  save(){
    this.toSave.index = "a";
    const holder:string[] =[];
    this.cities.forEach(element => {
      holder.push(element.toString());
    });
    this.toSave.cities = holder
    this.wSvc.updateDexie(this.toSave);
  }

}
