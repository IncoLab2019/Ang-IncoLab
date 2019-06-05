import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { ProductoTabla } from '../models/producto.mostrar.model';
import { ProductosModificar } from '../models/producto.modificar.model';
import { Proveedor } from '../models/proveedores.model';
import { Categorias } from '../models/categorias.model';
import { Presentacion } from '../models/presentacion.model';
import { Unidades } from '../models/unidades.model';
import { SubCategoria } from '../models/subcategoria.model';
import { Usuarios } from '../models/usuarios.model';
import { Sucursal } from '../models/sucursal.model';
import { Graficos } from '../models/graficos.model';
import { Productos } from '../models/productos.model';

@Injectable({
  providedIn: 'root'
})

export class ServicioMostrar {

  // Arreglos que contienen los valores desde la BD
  _productos: ProductoTabla[] = [];
  _proveedores: Proveedor[] = [];
  _categorias: Categorias[] = [];
  _presentacion: Presentacion[] = [];
  _unidades: Unidades[] = [];
  _subcategorias: SubCategoria[] = [];
  _usuario: Usuarios[] = [];
  _sucursal: Sucursal[] = [];
  //_grafico: Graficos[] = [];
  _productosLista: Productos[] = [];

  private productoActualizado = new Subject<ProductoTabla[]>();
  private proveedorActualizado = new Subject<Proveedor[]>();
  private categoriaActualizado = new Subject<Categorias[]>();
  private presentacionActualizado = new Subject<Presentacion[]>();
  private unidadesActualizado = new Subject<Unidades[]>();
  private subcategoriaActualizado = new Subject<SubCategoria[]>();
  private usuarioActualizado = new Subject<Usuarios[]>();
  private sucursalActualizado = new Subject<Sucursal[]>();
  private graficoActualizado = new Subject<Graficos[]>();
  private productosListaActualizado = new Subject<Productos[]>();

  constructor(private http: HttpClient) {}

////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// INFO GRAFICOS ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
obtenerGraficos() {
  /*this.http.get<{ message: string, grafico: Graficos[] }>(
    'http://localhost:3000/api/posts/inicio/graficos'
  ).subscribe((respuesta) => {
    this._grafico = respuesta.grafico;
    this.graficoActualizado.next([...this._grafico]);
  });*/
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// MOSTRAR TABLA //////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
mostrarTabla() {
  this.http.get<{ message: string, tabla: ProductoTabla[] }>(
    'http://localhost:3000/api/posts/inicio/tabla'
  ).subscribe((respuesta) => {
    this._productos = respuesta.tabla;
    this.productoActualizado.next([...this._productos]);
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// MOSTRAR TABLA INACTIVOS ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
obtenerTablaProdIn() {
  this.http.get<{ message: string, tabla: ProductoTabla[] }>(
    'http://localhost:3000/api/posts/inicio/tablaProdIn'
  ).subscribe((respuesta) => {
    this._productos = respuesta.tabla;
    this.productoActualizado.next([...this._productos]);
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// MOSTRAR TABLA PRODUCTOS POR VENCER ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
obtenerTablaProdVen() {
  this.http.get<{ message: string, tabla: ProductoTabla[] }>(
    'http://localhost:3000/api/posts/inicio/tablaProdVen'
  ).subscribe((respuesta) => {
    this._productos = respuesta.tabla;
    this.productoActualizado.next([...this._productos]);
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////// OBTIENE LOS DATOS DE CADA PRODUCTO QUE SE QUIERE MODIFICAR //////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
obtenerDatosModificar(id: string) {
  return this.http
      .get<{ message: string, datos: ProductosModificar[] }>(
        'http://localhost:3000/api/posts/inicio/editar/' + id);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// MOSTRAR TABLA PRODUCTOS POR ACABAR ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
obtenerTablaProdAca() {
  this.http.get<{ message: string, tabla: ProductoTabla[] }>(
    'http://localhost:3000/api/posts/inicio/tablaProdAca'
  ).subscribe((respuesta) => {
    this._productos = respuesta.tabla;
    this.productoActualizado.next([...this._productos]);
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// MOSTRAR TABLA PROVEEDORES INACTIVOS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

obtenerTablaProvIn() {
  this.http.get<{ message: string, tabla: Proveedor[] }>(
    'http://localhost:3000/api/posts/inicio/tablaProvIn'
  ).subscribe((respuesta) => {
    this._proveedores = respuesta.tabla;
    this.proveedorActualizado.next([...this._proveedores]);
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// MOSTRAR TABLA USUARIOS INACTIVOS ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
obtenerTablaUserIn() {
  this.http.get<{ message: string, tabla: Usuarios[] }>(
    'http://localhost:3000/api/posts/inicio/tablaUserIn'
  ).subscribe((respuesta) => {
    this._usuario = respuesta.tabla;
    this.usuarioActualizado.next([...this._usuario]);
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// MOSTRAR TABLA SUCURSALES INACTIVAS /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
obtenerTablaSucurIn() {
  this.http.get<{ message: string, tabla: Sucursal[] }>(
    'http://localhost:3000/api/posts/inicio/tablaSucurIn'
  ).subscribe((respuesta) => {
    this._sucursal = respuesta.tabla;
    this.sucursalActualizado.next([...this._sucursal]);
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// OBTIENE DATOS POR DEFECTO PARA FORMULARIOS /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
obtenerDatosDefecto() {
  this.http
    // tslint:disable-next-line: max-line-length
    .get<{ message: string, categorias: Categorias[], proveedores: Proveedor[], subcategoria: SubCategoria[], presentacion: Presentacion[], unidades: Unidades[] }>(
      'http://localhost:3000/api/posts/inicio/ingreso_manual'
    ).subscribe((response) => {
      this._categorias = response.categorias;
      this._proveedores = response.proveedores;
      this._subcategorias = response.subcategoria;
      this._presentacion = response.presentacion;
      this._unidades = response.unidades;

      this.categoriaActualizado.next([...this._categorias]);
      this.proveedorActualizado.next([...this._proveedores]);
      this.subcategoriaActualizado.next([...this._subcategorias]);
      this.presentacionActualizado.next([...this._presentacion]);
      this.unidadesActualizado.next([...this._unidades]);
    });
}

obtenerListaProductos(){
  this.http.get<{productos: Productos[]}>('http://localhost:3000/api/posts/inicio/listado/productos')
    .subscribe((response) => {
      this._productosLista = response.productos;
      this.productosListaActualizado.next([...this._productosLista]);
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// OBTIENE LOS DATOS DE PRODUCTOS A VENCER ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
  obtenerProductosVencimiento() {
    this.http
      .get<{ message: string, productosVencer: ProductoTabla[] }>(
        'http://localhost:3000/api/posts/inicio/popup'
      ).subscribe((response) => {
        this._productos = response.productosVencer;
        this.productoActualizado.next([...this._productos]);
      });
  }

  /* Para categorias */
  getCategoriaListener() {
    return this.categoriaActualizado.asObservable();
  }

  /* Para presentacion */
  getPresentacionListener() {
    return this.presentacionActualizado.asObservable();
  }

  /* Para unidades */
  getUnidadListener() {
    return this.unidadesActualizado.asObservable();
  }

  /* Para subcategorias */
  getSubCategoriaListener() {
    return this.subcategoriaActualizado.asObservable();
  }

  /* Para productos */
  getProductoListener() {
    return this.productoActualizado.asObservable();
  }

  /* Para proveedores */
  getProveedoresListener() {
    return this.proveedorActualizado.asObservable();
  }

  getSucursalListener() {
    return this.sucursalActualizado.asObservable();
  }

  getUsuarioListener(){
    return this.usuarioActualizado.asObservable();
  }

  getGraficosListener(){
    return this.graficoActualizado.asObservable();
  }

  getProductosListener(){
    return this.productoActualizado.asObservable();
  }

}
