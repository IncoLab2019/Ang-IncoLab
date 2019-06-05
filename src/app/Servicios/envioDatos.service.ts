import { Injectable } from '@angular/core';

@Injectable()
export class EnvioDatosService{
    jsonObject;
    constructor(){
      this.jsonObject= {};
    }
    setJsonObject(val: object){
      this.jsonObject= val;
    }
    getJsonObject(){
      return this.jsonObject;
    }
}