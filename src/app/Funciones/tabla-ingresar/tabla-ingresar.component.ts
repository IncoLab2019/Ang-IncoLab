import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ServicioMostrar } from 'src/app/Servicios/mostrar.datos.service';
import { ServicioModificar } from 'src/app/Servicios/modificar.service';
import { ProductoTabla } from 'src/app/models/producto.mostrar.model';
import { ServicioDesactivar } from 'src/app/Servicios/desactivar.service';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-tabla-ingresar', /* identificador */
  styleUrls: ['./tabla-ingresar.component.scss'], /* estilos */
  templateUrl: './tabla-ingresar.component.html', /* estructura */
  /* elementos q,ue corresponden a la estructura del componente */
})
export class TablaIngresarComponent implements OnInit, OnDestroy {

  /* Productos */
  productos: ProductoTabla[]; /* almacenará los productos que se mostrarán en la tabla */
  private productoSub: Subscription;
  editData:any = {};

  settings = {
    actions: {
      name: 'Acciones',
      add: false,
      position: 'right', // left|right
      custom: [{ name: 'routeToAPage', title: '<i class="ion-md-eye"></i>'}]
    },
    rowClassFunction: (row) => { 
      
  
      if (row.data.TOTAL_UNITARIO <= 10) {
        return 'critico'; // Agrega clase al 'tr' de tipo critico
      } else if (row.data.NOMBRE_SUB_CATEGORIA === 'CONSUMIBLE' && row.data.TOTAL_UNITARIO <= 20 && row.data.TOTAL_UNITARIO >= 10) {
        return 'aviso'; // Agrega clase al 'tr' de tipo aviso
      }

    },
    /* estructura de la tabla */
    columns: {
      NOMBRE_SUB_CATEGORIA: {
        title: 'Categoría',
        editable: false
        
      },
      COD_PRODUCTO: {
        title: 'Código',
        editable: false
      },
      NOMBRE_PRODUCTO: {
        title: 'Nombre'
      },
      NOMBRE_PRESENTACION: {
        title: 'Presentación',
        editable: false
      },
      UNIDADES: {
        title: 'Unidades'
      },
      COSTO_TOTAL_PRODUCTO: {
        title: 'Costo Total',
      },
      COSTO_UNITARIO: {
        title: 'Costo Unitario',
      },
      FECHA: {
        title: 'Fecha Vencimiento',
        editable: false
      },
      CANTIDAD_USO: {
        title: 'Uso',
        width: '20px'
      },
      CANTIDAD_STOCK: {
        title: 'Stock',
        width: '20px'
      },
      TOTAL_UNITARIO: {
        title: 'Total',
        editable: false,
        width: '20px'
      }
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="ion-md-create" ></i>',
      saveButtonContent: '<i class="ion-md-checkmark"></i>',
      cancelButtonContent: '<i class="ion-md-close"></i>'
    },
    delete: {
      deleteButtonContent:  '<i class="ion-md-trash"></i>',
      confirmDelete: true
    }

  };
  constructor(
    public servicioMostrar: ServicioMostrar,
    public servicioDesactivar: ServicioDesactivar,
    public servicioModificar: ServicioModificar,
    public router: Router) { }

  ngOnInit() {
    this.obtenerProductos();
  }

  /* se cargan los datos en la tabla */
  obtenerProductos() {
    this.servicioMostrar.mostrarTabla(); // se llama el metodo desde el service
    this.productoSub = this.servicioMostrar.getProductoListener() // Se maneja por medio del listener actualizado
    .subscribe((tabla: ProductoTabla[]) => {
      this.productos = tabla;
    },
    (error) => {
    });


  }

  /*método para desactivar un producto, sustituye la opción de "eliminar" */
  desactivarProducto(event) {
    Swal.fire({
      title: '¿Desea desactivar el producto?',
      type: 'warning',
      text: 'Este se puede volver a activar desde la opción de inactivos',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.value) {
        this.servicioDesactivar.desactivarProducto(event.data.COD_PRODUCTO)
          .subscribe(responseData => {
            this.servicioMostrar.mostrarTabla();
        });
        Swal.fire(
          'Producto desactivado',
          '',
          'success'
        );
      }
    });
  }
/* cuando el usuario selecciona la casilla por modificar */
  editar(event) {
    // Cuando el usuario quiere modificar datos desde la tabla de productos
    this.servicioModificar.modificarProductoTabla(
      event.newData.COD_PRODUCTO,
      event.newData.NOMBRE_PRODUCTO,
      event.newData.UNIDADES,
      event.newData.CANTIDAD_STOCK,
      event.newData.CANTIDAD_USO,
      event.newData.COSTO_TOTAL_PRODUCTO
      );
  }

  onFoo(event){
    // Cuando el usuario presiona el icomo del ojo, primero se cargaran los datos del producto
    // enviando el codigo a la BD, luego se dirige al componente que contiene el formulario para editar
    this.servicioMostrar.obtenerDatosModificar(event.data.COD_PRODUCTO)
    .subscribe(responseData => {
      this.router.navigate(['/inicio/editar/' + event.data.COD_PRODUCTO]); // componente para modificar producto
    }); 
  }

  ngOnDestroy() {
    this.productoSub.unsubscribe();
  }
}
