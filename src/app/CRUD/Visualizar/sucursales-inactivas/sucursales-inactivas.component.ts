import { Component, OnInit } from '@angular/core';
import { ServicioMostrar } from '../../../Servicios/mostrar.datos.service';
import { ServicioReactivar } from '../../../Servicios/reactivar.service';
import { Sucursal } from '../../../models/sucursal.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sucursales-inactivas',
  styleUrls: ['./sucursales-inactivas.component.scss'],
  template: `
        <nb-layout>
                <nb-layout-header fixed>
                    <app-encabezado></app-encabezado>
                </nb-layout-header>
                <nb-layout-column>
                    <ng2-smart-table
                     [settings]="settings"
                     [source]="sucursales"
                     (custom)="reactivarSucursal($event)">
                    </ng2-smart-table>
                </nb-layout-column>
                <nb-sidebar tag="menu-sidebar">
                    <app-barra-menu></app-barra-menu>
                </nb-sidebar>
                <nb-layout-footer fixed>
                    <app-pie-pagina></app-pie-pagina>
                </nb-layout-footer>
        </nb-layout>`
})
export class SucursalesInactivasComponent implements OnInit {

 /* Productos */
 sucursales: Sucursal[]; /* almacenará los productos que se mostrarán en la tabla */
 private sucursalSub: Subscription;
 settings = {
    actions: {
      name: "Acciones",
      edit: false,
      delete: false,
      add: false,
      position: 'right', // left|right
      custom: [{ name: 'routeToAPage', title: '<i class="ion-md-create"></i>'}]
   },
   /* estructura de la tabla */
   columns: {
     ID_SUCURSAL: {
       title: 'Identificación',
     },
     NOMBRE: {
       title: 'Nombre',
     },
     DIRECCION: {
       title: 'Dirección'
     },
     TELEFONO: {
       title: 'Teléfono',
     },
     ESTADO: {
       title: 'Estado'
     }
   },
 };

 constructor(
   public servicioMostrar: ServicioMostrar,
   public servicioReactivar: ServicioReactivar,
   public router: Router
  ) {}

 ngOnInit() {
   this.obtenerSucursales();
 }

 /* se cargan los datos en la tabla */
 obtenerSucursales() {
   this.servicioMostrar.obtenerTablaSucurIn();
   this.sucursalSub = this.servicioMostrar.getSucursalListener()
   .subscribe((tabla: Sucursal[]) => {
     this.sucursales = tabla;
   },
   (error) => {
     console.log('Error es: ', error);
   });
 }

 reactivarSucursal(event) {
   Swal.fire({
    title: '¿Desea volver a activar el producto?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Activar'
  }).then((result) => {
    if (result.value) {
      this.servicioReactivar.reactivarSucursal(event.data.ID_SUCURSAL)
        .subscribe(responseData => {
          console.log('se ingresaron datos al servicio', responseData.message);
          this.servicioMostrar.obtenerTablaSucurIn();
        });
      Swal.fire(
        'Producto activado',
        '',
        'success'
      );
    }
  });
 }

 ngOnDestroy() {
   this.sucursalSub.unsubscribe();
 }
}


