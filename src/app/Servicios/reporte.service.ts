import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Reportes } from '../models/reportes.model';


@Injectable({
    providedIn: 'root'
})

export class ServicioReporte{
    _reporte: Reportes[] = [];

    private reporteActualizado = new Subject<Reportes[]>();

    constructor(private http: HttpClient){}


    obtenerDatosReportes(){
        this.http.get<{ message: string, reporte:Reportes[]}>(
            'http://localhost:3000/api/posts/inicio/reportes'
        ).subscribe((respuesta)=>{
            this._reporte = respuesta.reporte;
            this.reporteActualizado.next([...this._reporte]);
        });
    }

    getReportesListener(){
        return this.reporteActualizado.asObservable();
    }



}