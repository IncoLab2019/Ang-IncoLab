import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicioMostrar } from '../../../Servicios/mostrar.datos.service';
import { ProductoTabla } from '../../../models/producto.mostrar.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-productos-acabarse',
  /* elementos que corresponden a la estructura del componente */
  template: `
        <nb-layout>
                <nb-layout-header fixed>
                    <app-encabezado></app-encabezado>
                </nb-layout-header>
                <nb-layout-column>
                    <ng2-smart-table
                     [settings]="settings"
                     [source]="productos">
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
export class TablaProductosAcabarseComponent implements OnInit {

 /* Productos */
 productos: ProductoTabla[]; /* almacenará los productos que se mostrarán en la tabla */
 private productoSub: Subscription;

 settings = {
   actions: {
      name: "Acciones",
      edit: false,
      delete: false,
      add: false,
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
       title: 'Unidades'
     },
     COSTO_TOTAL_PRODUCTO: {
       title: 'Costo Total',
     },
     FECHA: {
       title: 'Fecha Vencimiento',
     },
     CANTIDAD_USO: {
       title: 'Uso'
     },
     CANTIDAD_STOCK: {
       title: 'Stock'
     },
     TOTAL_UNITARIO: {
       title: 'Total',
     }
   },
 };

 constructor(
    public servicioMostrar: ServicioMostrar,
    public router: Router
  ) {}

 ngOnInit() {
   this.obtenerProductos();
 }

 /* se cargan los datos en la tabla */
 obtenerProductos() {
   this.servicioMostrar.obtenerTablaProdAca();
   this.productoSub = this.servicioMostrar.getProductoListener()
   .subscribe((tabla: ProductoTabla[]) => {
     this.productos = tabla;
     console.log(this.productos);
   },
   (error) => {
     console.log('Error es: ', error);
   });
 }

  ngOnDestroy() {
    this.productoSub.unsubscribe();
  }
}
