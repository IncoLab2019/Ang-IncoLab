import { Injectable } from '@angular/core';

@Injectable()
export class ManejoErrores{
    manejoError: boolean; 
    constructor(){
      this.manejoError = true;
    }
    setManejoError(error: boolean){
      this.manejoError = error;
    }
    getManejoError(){
      return this.manejoError;
    }
}