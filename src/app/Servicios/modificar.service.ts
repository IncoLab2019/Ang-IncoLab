import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Proveedor } from '../models/proveedores.model';
import { Categorias } from '../models/categorias.model';
import { Presentacion } from '../models/presentacion.model';
import { Unidades } from '../models/unidades.model';
import { SubCategoria } from '../models/subcategoria.model';
import { modificarCantidades } from '../models/cantidades.model';
import { ProductosAModificar } from '../models/producto.dmodificar.model';
import { ServicioMostrar } from './mostrar.datos.service';


@Injectable({
  providedIn: 'root'
})
export class ServicioModificar {

  // Arreglos que contienen los valores desde la BD
  private proveedores: Proveedor[] = [];
  private categorias: Categorias[] = [];
  private presentacion: Presentacion[] = [];
  private unidades: Unidades[] = [];
  private subcategorias: SubCategoria[] = [];

  // Variables para el intercambio de valores para la BD
  private codigo_proveedor: string;
  private codigo_categoria: string;
  private codigo_subcategoria: string;
  private presentacion_: number;
  private unidadPresentacion_: number;

  constructor(private http: HttpClient,  private router: Router, private servicioMostrar: ServicioMostrar) {}

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// MODIFICAR PRODUCTOS /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
modificarProductoTabla( // Modifica los datos del producto desde la tabla principal
  codigo: string,
  nombre: string,
  unidades: string,
  stock: string,
  enuso: string,
  costo: string) {

    /* Se ingresan los datos a un JSON, los nombres en mayuscula son los nombres de las celdas de la BD */
    const datosModificados = {
      COD_PRODUCTO: codigo,
      NOMBRE_PRODUCTO: nombre,
      COSTO_TOTAL_PRODUCTO: costo,
      STOCK: stock,
      ENUSO: enuso,
      UNIDADES: unidades
    };

    /* Se envia los datos a rutas.js */
    this.http.put<{message: string}>('http://localhost:3000/api/posts/inicio/editar_tabla', datosModificados)
      .subscribe(respuesta => {
        console.log(respuesta.message);
        this.router.navigate(['/inicio/tabla']); /* Redirecciona a la tabla despues de modificar los datos */
      });
}

/////////////////////////////////////////////////////////////////////////////////////
  modificarProducto( // Modifica los datos desde el formulario para edicion
    codigo: string,
    producto: string,
    categoria: string,
    subcategoria: string,
    costoTotal: number,
    fechaVencimiento: string,
    proveedor: string,
    descripcion: string,
    presentacion: string,
    unidadPresentacion: string,
    unidades: number,
    moneda: string,
    stock: number,
    enuso: number,
    estado: number) {

    /////////////////////////////////////////////////////////////
    /* Para pasar los nombres a codigos para la base de datos. */
    /* Se llama al servicio mostrar para obtener los arreglos con los datos respectivos a proveedores,
    categorias, subcategorias... etc */
    for (const item of this.servicioMostrar._proveedores) {
      if (proveedor === item.NOMBRE_PROVEEDOR ) {
        this.codigo_proveedor = item.ID_PROVEEDOR;
      }
    }

    for (const item2 of this.servicioMostrar._categorias) {
      if (categoria === item2.NOMBRE_CATEGORIA ) {
        this.codigo_categoria = item2.COD_CATEGORIA;
      }
    }

    for (const item3 of this.servicioMostrar._subcategorias) {
      if (subcategoria === item3.NOMBRE_SUB_CATEGORIA ) {
        this.codigo_subcategoria = item3.COD_SUB_CATEGORIA;
      }
    }

    for (const item4 of this.servicioMostrar._presentacion) {
      if (presentacion === item4.NOMBRE_PRESENTACION ) {
        this.presentacion_ = item4.ID_PRESENTACION;
      }
    }

    for (const item5 of this.servicioMostrar._unidades) {
      if (unidadPresentacion === item5.NOMBRE_UNIDAD ) {
        this.unidadPresentacion_ = item5.ID_UNIDADES_PRESENTACION;
      }
    }
    /////////////////////////////////////////////////////////////
    const datosModificados: ProductosAModificar = {
      COD_PRODUCTO: codigo,
      NOMBRE_PRODUCTO: producto,
      COD_CATEGORIA: this.codigo_categoria,
      COD_SUB_CATEGORIA: this.codigo_subcategoria,
      COSTO_TOTAL_PRODUCTO: costoTotal,
      FECHA_VENCIMIENTO: fechaVencimiento,
      ID_PROVEEDOR: this.codigo_proveedor,
      DESCRIPCION: descripcion,
      STOCK: stock,
      ENUSO: enuso,
      ESTADO_CRITICO: estado,
      ID_PRESENTACION: this.presentacion_,
      ID_UNIDADES_PRESENTACION: this.unidadPresentacion_ ,
      UNIDADES: unidades,
      MONEDA: moneda
    };

    /* Envio de datos modificados al rutas.js */
    this.http.put<{message: string}>('http://localhost:3000/api/posts/inicio/editar', datosModificados)
      .subscribe(respuesta => {
        console.log(respuesta.message);
        this.router.navigate(['/inicio/tabla']); /* Redirecciona a la tabla despues de actualizar */
      });
  }

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// MODIFICAR PROVEEDORES ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// MODIFICAR SUCURSALES ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// MODIFICAR USUARIOS //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
  modificarCantidades(codigo: string, stock: number, enuso: number, total:number){
    const cantidades: modificarCantidades = {
      COD_PRODUCTO: codigo,
      STOCK: stock,
      ENUSO: enuso,
      TOTAL_INICIAL: total
    };
    this.http.put<{message: string}>('http://localhost:3000/api/posts/inicio/editar', cantidades)
      .subscribe(respuesta => {
        this.router.navigate(['/inicio/tabla']);
      });
  }
}
