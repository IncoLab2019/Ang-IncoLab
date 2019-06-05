import { OnInit, Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Proveedor } from '../../../models/proveedores.model';
import { Categorias } from '../../../models/categorias.model';
import { Presentacion } from '../../../models/presentacion.model';
import { Unidades } from '../../../models/unidades.model';
import { SubCategoria } from '../../../models/subcategoria.model';


import { ServicioMostrar } from 'src/app/Servicios/mostrar.datos.service';
import { ServicioIngresar } from 'src/app/Servicios/ingresar.service';
import { ManejoErrores } from 'src/app/Servicios/manejoErrores.service';

import { NbAccessChecker } from '@nebular/security';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-producto-manual',
  templateUrl: './ingreso-producto-manual.component.html',
  styleUrls: ['./ingreso-producto-manual.component.scss']
})

export class IngresoProductoManualComponent implements OnInit, OnDestroy {

  model: any = {};

  /* atributos para mostrar los proveedores, categorias principales,
  subcategorias y las unidades por presentacion guardadas en la BD */
  proveedores: Proveedor[];
  categorias: Categorias[];
  presentaciones: Presentacion[];
  unidades: Unidades[];
  subcategorias: SubCategoria[];

  private proveedorSub: Subscription;
  private categoriaSub: Subscription;
  private presentacionSub: Subscription;
  private unidadesSub: Subscription;
  private subcategoriaSub: Subscription;

  // Varible formato fecha:
  fechaMinima = new Date(2015, 0, 1); // aaaa-mm-dd

  constructor(public servicioIngresar: ServicioIngresar, public servicioMostrar: ServicioMostrar, public accessChecker: NbAccessChecker, private manejoErrores: ManejoErrores) {}

  ngOnInit() {
    this.obtenerDatosDefecto();
  }

  /**  Obtiene los datos que deben estar antes para ingresar los productos **/

 obtenerDatosDefecto() {
   this.servicioMostrar.obtenerDatosDefecto();

   this.subcategoriaSub = this.servicioMostrar.getSubCategoriaListener()
   .subscribe((subcategoria: SubCategoria[]) => {
       this.subcategorias = subcategoria;
   },
   (error) => {
     console.log('Error es: ', error);
   });

   this.proveedorSub = this.servicioMostrar.getProveedoresListener()
   .subscribe((proveedores: Proveedor[]) => {
     this.proveedores = proveedores;
   },
   (error) => {
     console.log('Error es: ', error);
   });

   this.categoriaSub = this.servicioMostrar.getCategoriaListener()
     .subscribe((categorias: Categorias[]) => {
       this.categorias = categorias;
   },
   (error) => {
     console.log('Error es: ', error);
   });

   this.unidadesSub = this.servicioMostrar.getUnidadListener()
   .subscribe((unidades: Unidades[]) => {
     this.unidades = unidades;
   },
   (error) => {
     console.log('Error es: ', error);
   });

   this.presentacionSub = this.servicioMostrar.getPresentacionListener()
   .subscribe((presentacion: Presentacion[]) => {
       this.presentaciones = presentacion;
   },
   (error) => {
     console.log('Error es: ', error);
   });

 }

  datosModal(form: NgForm) {
    this.servicioIngresar.agregarProductos(
      form.value.codigo,
      form.value.producto,
      form.value.categoria,
      form.value.subcategoria,
      form.value.costo,
      form.value.fechaVencimiento,
      form.value.proveedor,
      form.value.estado,
      form.value.descripcion,
      form.value.presentacion,
      form.value.unidadpresentacion,
      form.value.unidad,
      form.value.moneda
    );
    console.log(this.manejoErrores.getManejoError());
    this.modalSwal();
  }

  ngOnDestroy() {
    this.proveedorSub.unsubscribe();
    this.categoriaSub.unsubscribe();
    this.presentacionSub.unsubscribe();
    this.unidadesSub.unsubscribe();
    this.subcategoriaSub.unsubscribe();
  }

  modalSwal() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000,
    });
    Toast.fire({
      type: 'success',
      title: 'El producto a sido agregado'
    });
  }

}
