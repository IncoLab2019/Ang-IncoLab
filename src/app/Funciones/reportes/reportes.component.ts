import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExporterService } from '../../Servicios/exporter.service';
import { MatTableDataSource, getMatIconFailedToSanitizeLiteralError, MatInput } from '@angular/material';
import { ServicioReporte } from '../../Servicios/reporte.service';
import { Reportes } from '../../models/reportes.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, PatternValidator } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { ServicioMostrar } from '../../Servicios/mostrar.datos.service';
import { ServicioReportes } from '../../Servicios/reportes.service';
import { EnvioDatosService } from '../../Servicios/envioDatos.service';


const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ReportesComponent implements OnInit {


  model: any = {};

  form: FormGroup;
  private productosSub: Subscription;

  fechaParceada_1;
  fechaParceada_2;

  primer_mes;
  segundo_mes;

  primer_año;
  segundo_año;

  rangoFechas;
  datosvisualizar;

  respuesta: any;

  tipoDatos = [
    { value : {name: 'Precio'}, tag : 'Precio' },
    { value : {name: 'Uso'}, tag  : 'Uso Mes Actual' },
  ];

  rangos = [
    { value : {name: 'Entre meses'}, tag : 'Entre meses' },
    { value : {name: 'Todos los meses'}, tag  : 'Todos los meses' },
  ];

  /*Reportes*/
  reportes: Reportes[];
  private reporteSub: Subscription;
  dataSource;
  productos:Reportes[] = [];

  constructor(
    private excelService: ExporterService,
    public servicioReporte: ServicioReporte,
    public router: Router,
    public servicioMostrar: ServicioMostrar,
    public servicioReportes: ServicioReportes,
    public route: ActivatedRoute,
    private compartirJson: EnvioDatosService,
    ) { }

  ngOnInit() {
    this.obtenerDatos();
    //--------------------------------------------------------
    this.form = new FormGroup({
      fechaInicial: new FormControl(moment(), {validators: [Validators.required]}),
      fechaFinal: new FormControl(moment(), {validators: [Validators.required ]}),
      tipoDato: new FormControl(this.tipoDatos[0].value,{}),
      rango: new FormControl(this.rangos[0].value,{})
    });
    //--------------------------------------------------------
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.form.value.fechaInicial;
    ctrlValue.year(normalizedYear.year());
    this.form.patchValue({fechaInicial: ctrlValue});
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.form.value.fechaInicial;
    ctrlValue.month(normalizedMonth.month());
    this.form.patchValue({fechaInicial: ctrlValue});
    datepicker.close();
  }

  chosenYearHandler2(normalizedYear: Moment) {
    const ctrlValue = this.form.value.fechaFinal;
    ctrlValue.year(normalizedYear.year());
    this.form.patchValue({fechaFinal: ctrlValue});
  }

  chosenMonthHandler2(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.form.value.fechaFinal;
    ctrlValue.month(normalizedMonth.month());
    this.form.patchValue({fechaFinal: ctrlValue});
    datepicker.close();
  }

  obtenerDatos(){
    this.servicioReporte.obtenerDatosReportes();
    this.reporteSub = this.servicioReporte.getReportesListener()
    .subscribe((reportes: Reportes[]) =>{
      this.reportes = reportes;
      const valor = JSON.parse(JSON.stringify(this.reportes));

     for (var g = 0; g < valor.length; g++) {
        this.productos.push(valor[g]);
      }


      this.dataSource = new MatTableDataSource(this.productos);

    },
    (error) => {
      console.log('Error es: ', error);
    });
  }



  obtenerMes(stringFecha: String){
    switch(stringFecha) {
      case'Jan':
        return 1;
      case'Feb':
        return 2;
      case'Mar':
        return 3;
      case'Apr':
        return 4;
      case'May':
        return 5;
      case'Jun':
        return 6;
      case'Jul':
        return 7;
      case'Aug':
        return 8;
      case'Sep':
        return 9;
      case'Oct':
        return 10;
      case'Nov':
        return 11;
      case'Dec':
        return 12;
    }
  }


  displayedColumns: string[] = ['codigo', 'nombre', 'precio', 'precio unitario', 'cantidad', 'fecha'];


  ExportAsXLSX():void{
    this.excelService.exportToExcel(this.dataSource.data, 'my_export');
  }

  ExportAsXLSXFilter():void{
    this.excelService.exportToExcel(this.dataSource.filteredData, 'my_export');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim();

  }

  applyFilter2(filterValue: string) {
    this.dataSource.data = this.dataSource.filteredData;
    this.dataSource.filter= filterValue.trim().toLocaleLowerCase();
  }

  cancelarFiltro(){
    this.dataSource = new MatTableDataSource(this.productos);
  }

  parametrosReporte(){
    this.fechaParceada_1 = this.form.value.fechaInicial.toString().split(" ", 4);

    this.primer_mes = this.obtenerMes(this.fechaParceada_1[1]);
    this.primer_año = this.fechaParceada_1[3];

    // -----------------------------------------

    this.fechaParceada_2 = this.form.value.fechaFinal.toString().split(" ", 4);

    this.segundo_mes = this.obtenerMes(this.fechaParceada_2[1]);
    this.segundo_año = this.fechaParceada_2[3];

    // -----------------------------------------
    this.datosvisualizar = this.form.value.tipoDato.name;
    this.rangoFechas = this.form.value.rango.name;

    if(this.dataSource.data > 6 ){ /* REVISAR SI SE PUEDE COMPARAR CON EL PATRÓN */
    if (this.rangoFechas == "Todos los meses"){
      if (this.datosvisualizar == "Precio") {
        this.servicioReportes.obtGraPreGeneral(this.dataSource.filter).subscribe(
          (response: any) => {
            this.respuesta = response;          
            this.compartirJson.setJsonObject(this.respuesta);
            this.router.navigate(['inicio/graficos']);
          });
      } else {
        this.servicioReportes.obtGraUsoGeneral(this.dataSource.filter).subscribe(
          (response: any) => {
            this.respuesta = response;            
            this.compartirJson.setJsonObject(this.respuesta);
            this.router.navigate(['inicio/graficos']);
          });
      }
    } else {
      if (this.datosvisualizar == "Precio") {
        this.servicioReportes.obtGraPreFiltrado(this.primer_mes, this.primer_año, this.segundo_mes, this.segundo_año, this.dataSource.filter)
          .subscribe((response: any) => {
            this.respuesta = response;
            this.compartirJson.setJsonObject(this.respuesta);
            this.router.navigate(['inicio/graficos']);
          });
      } else {
        this.servicioReportes.obtGraUsoFiltrado(this.primer_mes, this.primer_año, this.segundo_mes, this.segundo_año, this.dataSource.filter)
        .subscribe((response: any) => {
          this.respuesta = response;
          this.compartirJson.setJsonObject(this.respuesta);
          this.router.navigate(['inicio/graficos']);
        });
      }
    }
  } else {
    console.log("Debe buscar por codigo"); /* CAMBIAR POR UNA VENTANA DE ALERTA */
  }
}

  ngOnDestroy() {
    this.reporteSub.unsubscribe();
  }

}
