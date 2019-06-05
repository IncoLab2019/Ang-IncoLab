import { Component, OnInit, OnDestroy, SystemJsNgModuleLoader } from '@angular/core';
import { ServicioMostrar } from '../../Servicios/mostrar.datos.service';
import { ProductoTabla } from '../../models/producto.mostrar.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  constructor(
    public servicioMostrar: ServicioMostrar,
    public router: Router
    ) { }

  // Prueba mensaje de productos a vencer al hacer un logon // almacenará los productos que se mostrarán en la tabla */
  productos: ProductoTabla[];
  productos2: ProductoTabla[];
  private productoSub: Subscription;

  ngOnInit() {
    this.obtenerProductos();
    this.obtenerProductos2();
    this.mostrarMensaje();
  }

  obtenerProductos() {
    this.servicioMostrar.obtenerTablaProdVen();
    this.productoSub = this.servicioMostrar.getProductoListener()
      .subscribe((tabla: ProductoTabla[]) => {
        this.productos = tabla;
      }, (error) => {
        console.log('Error es: ', error);
      });
  }

  obtenerProductos2() {
    this.servicioMostrar.obtenerTablaProdAca();
    this.productoSub = this.servicioMostrar.getProductoListener()
      .subscribe((tabla: ProductoTabla[]) => {
        this.productos2 = tabla;
      }, (error) => {
        console.log('Error es: ', error);
      });
  }

  mostrarMensaje() {
   this.productoSub = this.servicioMostrar.getProductoListener()
    .subscribe((tabla: ProductoTabla[]) => {
      this.productos = tabla;
      this.productos2 = tabla;
      if (this.productos.length !== 0) {
        // -------------------------
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          showCloseButton: true,

        });
        Toast.fire({
          type: 'warning',
          title: 'Hay productos prontos a vencer',
          onAfterClose: () => {
            if (this.productos2.length !== 0) {
              Toast.fire({
                type: 'warning',
                title: 'Hay productos pronto a acabarse'});
            }
          }
        })
      }
    }, (error) => {
      console.log('Error es: ', error);
    });


  }

   ngOnDestroy() {
    this.productoSub.unsubscribe();
   }
}
