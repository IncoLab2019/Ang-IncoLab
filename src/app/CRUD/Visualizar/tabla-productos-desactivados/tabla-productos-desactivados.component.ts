import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicioReactivar } from '../../../Servicios/reactivar.service';
import { ServicioMostrar } from '../../../Servicios/mostrar.datos.service';
import { ProductoTabla } from '../../../models/producto.mostrar.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-productos-desactivados',
  template: `
        <nb-layout>
                <nb-layout-header fixed>
                    <app-encabezado></app-encabezado>
                </nb-layout-header>
                <nb-layout-column>
                    <ng2-smart-table
                     [settings]="settings"
                     [source]="productos"
                     (custom)="reactivarProducto($event)">
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
export class TablaProductosDesactivadosComponent implements OnInit, OnDestroy {

  /* Productos */
  productos: ProductoTabla[]; /* almacenará los productos que se mostrarán en la tabla */
  private productoSub: Subscription;
  settings = {
    actions: {
      edit: false,
      delete: false,
      add: false,
      title: 'Acciones',
      position: 'right', // left|right
      custom: [{ name: 'routeToAPage', title: '<i class="ion-md-create"></i>'}]
    },
    /* estructura de la tabla */
    columns: {
      NOMBRE_SUB_CATEGORIA: {
        title: 'Categoría',
      },
      COD_PRODUCTO: {
        title: 'Código',
      },
      NOMBRE_PRODUCTO: {
        title: 'Nombre'
      },
      NOMBRE_PRESENTACION: {
        title: 'Presentación',
      },
      UNIDADES: {
        title: 'Unidades',
      },
      COSTO_TOTAL_PRODUCTO: {
        title: 'Costo Total',
      },
      FECHA: {
        title: 'Fecha Vencimiento',
      },
      CANTIDAD_USO: {
        title: 'Uso',
      },
      CANTIDAD_STOCK: {
        title: 'Stock',
      },
      TOTAL_UNITARIO: {
        title: 'Total',
      }
    },
  };
  constructor(
    public servicioReactivar: ServicioReactivar,
    public servicioMostrar: ServicioMostrar,
    public router: Router
  ) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  /* se cargan los datos en la tabla */
  obtenerProductos() {
    this.servicioMostrar.obtenerTablaProdIn();
    this.productoSub = this.servicioMostrar.getProductoListener()
    .subscribe((tabla: ProductoTabla[]) => {
      this.productos = tabla;
    },
    (error) => {
      console.log('Error es: ', error);
    });
  }

  reactivarProducto(event) {
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
        this.servicioReactivar.reactivarProducto(event.data.COD_PRODUCTO)
        .subscribe(responseData => {
          console.log('se ingresaron datos al servicio', responseData.message);
          this.servicioMostrar.obtenerTablaProdIn();
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
    this.productoSub.unsubscribe();
  }
}

