import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Graficos } from '../models/graficos.model';

@Injectable({
    providedIn: 'root'
})

export class ServicioReportes {


    constructor(private http: HttpClient){}

    // Reporte de todos los productos por fecha
    obtGraPreFiltrado(primerMes: string, primerAnio: string, segundoMes: string, segundoAnio: string, id: string){
        return this.http.get<{ message: string, grafico: Graficos[] }>(
            'http://localhost:3000/api/posts/inicio/graficos/precio/filtrado/' + id + '/' + primerMes + '/' + primerAnio + '/' + segundoMes + '/' + segundoAnio);
    }

    // Reporte de producto de todas las fechas
    obtGraPreGeneral(id: string) {
        return this.http.get<{ message: string, grafico: Graficos[] }>(
          'http://localhost:3000/api/posts/inicio/graficos/precio/general/'+id);
      }

    // Reporte de categoría por fecha
    obtGraUsoGeneral(id: string){
        return this.http.get<{ message: string, grafico: Graficos[] }>(
            'http://localhost:3000/api/posts/inicio/graficos/cantidades/general/' + id);
    }    

    // Reporte de producto por fecha
    obtGraUsoFiltrado(primerMes: string, primerAnio: string, segundoMes: string, segundoAnio: string, id: string){
        return this.http.get<{ message: string, grafico: Graficos[] }>(
            'http://localhost:3000/api/posts/inicio/graficos/cantidades/filtrado/' + id + '/' + primerMes + '/' + primerAnio + '/' + segundoMes + '/' + segundoAnio);
    }
}