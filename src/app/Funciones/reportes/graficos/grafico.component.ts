import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicioMostrar } from 'src/app/Servicios/mostrar.datos.service';

import { EnvioDatosService } from '../../../Servicios/envioDatos.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html'
})
export class GraficosComponent implements OnInit, OnDestroy {
  
  datos;
  fecha: string[] = [];
  gasto: number[] = [];
  dato: number[] = [];
  titulo: string;
  graficos: any = [];

  constructor(public sm: ServicioMostrar, private compartirJson: EnvioDatosService) { }



  ngOnInit() {
    this.obtenerInformacion();

  }

  obtenerInformacion() {

    if(this.compartirJson == null){
        
    } else {
      const valor = JSON.parse(JSON.stringify(this.compartirJson.getJsonObject()));

    console.log(valor);
      for (var g = 0; g < valor['datos'].length; g++) {
        this.titulo = valor['datos'][g]['cod_producto']
        this.fecha.push(valor['datos'][g]['fecha']);
        this.dato.push(valor['datos'][g]['dato']);
      }
    }
  }

  public graph = {
    data: [
        { x: this.fecha, // this.grafico[0]['gastos'], this.grafico[1]['gastos']
          y: this.dato, // this.grafico[0]['fecha'], this.grafico[1]['fecha']
          type: 'scatter' },
    ],
    mode: 'lines+points', marker: {color: 'red'},
    layout: {autosize: true, title: this.titulo} // en el titulo iria el nombre de producto por ejemplo.
  };

  ngOnDestroy() {
    this.compartirJson.setJsonObject(null)
  }

}
