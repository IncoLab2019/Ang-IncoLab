import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicioReactivar } from '../../../Servicios/reactivar.service';
import { ServicioMostrar } from '../../../Servicios/mostrar.datos.service';
import { Proveedor } from '../../../models/proveedores.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-proveedores-desactivados',
  template: `
        <nb-layout>
                <nb-layout-header fixed>
                    <app-encabezado></app-encabezado>
                </nb-layout-header>
                <nb-layout-column>
                    <ng2-smart-table
                     [settings]="settings"
                     [source]="proveedores"
                     (custom)="reactivarProveedor($event)">
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
export class TablaProveedoresDesactivadosComponent implements OnInit {

  /* Productos */
  proveedores: Proveedor[]; /* almacenará los proveedores que se mostrarán en la tabla */
  private proveedorSub: Subscription;
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
      ID_PROVEEDOR: {
        title: 'Identificación',
      },
      NOMBRE_PROVEEDOR : {
        title: 'Nombre',
      },
      DESCRIPCION : {
        title: 'Descripción'
      },
      TELEFONO: {
        title: 'Teléfono',
      },
      CORREO: {
        title: 'Correo'
      }
    },
  };
  constructor(
    public servicioReactivar: ServicioReactivar,
    public servicioMostrar: ServicioMostrar,
    public router: Router
  ) {}

  ngOnInit() {
    this.obtenerProveedores();
  }

  /* se cargan los datos en la tabla */
  obtenerProveedores() {
    this.servicioMostrar.obtenerTablaProvIn();
    this.proveedorSub = this.servicioMostrar.getProveedoresListener()
    .subscribe((tabla: Proveedor[]) => {
      this.proveedores = tabla;
    },
    (error) => {
      console.log('Error es: ', error);
    });
  }

  reactivarProveedor(event) {
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
        this.servicioReactivar.reactivarProveedor(event.data.ID_PROVEEDOR)
        .subscribe(responseData => {
          console.log('se ingresaron datos al servicio', responseData.message);
          this.servicioMostrar.obtenerTablaProvIn();
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
    this.proveedorSub.unsubscribe();
  }
}


