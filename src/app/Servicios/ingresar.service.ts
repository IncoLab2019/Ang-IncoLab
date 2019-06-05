import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Proveedor } from '../models/proveedores.model';
import { Usuarios } from '../models/usuarios.model';
import { Sucursal } from '../models/sucursal.model';
import { Categorias } from '../models/categorias.model';
import { ProductosIngresar } from '../models/producto.ingresar.model';
import { ServicioMostrar } from './mostrar.datos.service';
import { ManejoErrores } from './manejoErrores.service';
import { Presentacion } from '../models/presentacion.model';


@Injectable({
  providedIn: 'root'
})
export class ServicioIngresar {

  

  constructor(private http: HttpClient, private servicioMostrar: ServicioMostrar, private manejoErrores: ManejoErrores) {}
  // Arreglos que contienen los valores desde la BD
  private productos: ProductosIngresar[] = [];
  private usuarios: Usuarios[] = [];
  private sucursales: Sucursal[] = [];
  private proveedores: Proveedor[] = [];
  private categorias: Categorias[] = [];
  private presentacion: Presentacion[] = [];

  private categoriaActualizado =  new Subject<Categorias[]>();
  private productoActualizado = new Subject<ProductosIngresar[]>();
  private proveedorActualizado = new Subject<Proveedor[]>();
  private sucursalActualizado = new Subject<Sucursal[]>();
  private usuarioActualizado = new Subject<Usuarios[]>();
  private presentacionActualizado = new Subject<Presentacion[]>();

  // Variables para el intercambio de valores para la BD
  private codigo_proveedor: string;
  private codigo_categoria: string;
  private codigo_subcategoria: string;
  private presentacion_: number;
  private unidadPresentacion_: number;
  private moneda: string;

///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// AGREGAR PRODUCTOS //////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
agregarProductos(
  codigo: string,
  producto: string,
  categoria: string,
  subcategoria: string,
  costoTotal: number,
  fechaVencimiento: string,
  proveedor: string,
  estado: number,
  descripcion: string,
  presentacion: string,
  unidadPresentacion: string,
  unidades: number,
  moneda: string
) {

  if (moneda === 'Colones') {
    this.moneda = '¢';
  } else if (moneda === 'Dólares') {
    this.moneda = '$';
  }
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
  /* Se ingesan los datos listos para ir a la BD */
  const datosIngresar: ProductosIngresar = {
    COD_PRODUCTO: codigo,
    NOMBRE_PRODUCTO: producto,
    COD_CATEGORIA: this.codigo_categoria,
    COD_SUB_CATEGORIA: this.codigo_subcategoria,
    COSTO_TOTAL_PRODUCTO: costoTotal,
    FECHA_VENCIMIENTO: fechaVencimiento,
    ID_PROVEEDOR: this.codigo_proveedor,
    ESTADO_CRITICO: estado,
    DESCRIPCION: descripcion,
    PRESENTACION: this.presentacion_,
    UNIDADES_PRESENTACION: this.unidadPresentacion_,
    UNIDADES: unidades,
    MONEDA: this.moneda
  };

  console.log(datosIngresar);

  /* Se envian los datos al servidor 3000 hacia rutas.js para despues enviarlos a la BD */
  this.http.post<{ message: string }>('http://localhost:3000/api/posts/inicio/ingreso_manual', datosIngresar)
  .subscribe( respuesta => {
      this.productos.push(datosIngresar);
      this.productoActualizado.next([...this.productos]); /* Se envia una copia del array */
      this.manejoErrores.setManejoError(true);
  }, error => {
    this.manejoErrores.setManejoError(false);
  });
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// AGREGAR USUARIOS/////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
agregarUsuarios(
  idResponsable: string,
  nombre: string,
  contrasenna: string
) {

  const usuario_: Usuarios = {
    ID_RESPONSABLE: idResponsable,
    NOMBRE_USUARIO: nombre,
    CONTRASENNA: contrasenna
  };

  this.http.post<{ message: string }>('http://localhost:3000/api/posts/inicio/ingresousuarios', usuario_)
  .subscribe(responseData => {
      console.log('Estoy en el ingresar-usuario service : ', responseData.message);
      this.usuarios.push(usuario_);
      console.log('Se ingresaron datos del usuario al servicio');
      this.usuarioActualizado.next([...this.usuarios]);
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// AGREGAR PROVEEDOR/////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
agregarProveedor(
  idProveedor: string,
  proveedor: string,
  telefono: string,
  correo: string,
  descripcion: string
) {

  const proveedor_: Proveedor = {
    ID_PROVEEDOR: idProveedor,
    NOMBRE_PROVEEDOR: proveedor,
    DESCRIPCION: descripcion,
    TELEFONO: telefono,
    CORREO: correo,
  };

  this.http.post<{ message: string }>('http://localhost:3000/api/posts/inicio/ingresosproveedores', proveedor_)
  .subscribe(responseData => {
      console.log('Estoy en el ingresar-Proveedor service : ', responseData.message);
      this.proveedores.push(proveedor_);
      console.log('Se ingresaron datos del proveedor al servicio');
      this.proveedorActualizado.next([...this.proveedores]);
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// AGREGAR SUCURSAL/////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
agregarSucursal(
  idSucursal: string,
  nombre: string,
  telefono: string,
  direccion: string
) {

  const sucursal_: Sucursal = {
    ID_SUCURSAL: idSucursal,
    NOMBRE: nombre,
    DIRECCION: direccion,
    TELEFONO: telefono,
  };

  this.http.post<{ message: string }>('http://localhost:3000/api/posts/inicio/ingresosucursales', sucursal_)
  .subscribe(responseData => {
      console.log('Estoy en el ingresar service: ', responseData.message);
      this.sucursales.push(sucursal_);
      console.log('Se ingresaron datos al servicio');
      this.sucursalActualizado.next([...this.sucursales]);
  });
}

  /* Para proveedores */
  getProveedorListener() {
    return this.proveedorActualizado.asObservable();
  }

  /* Para Productos */
  getProductoListener() {
    return this.productoActualizado.asObservable();
  }

  /* Para Usuarios */
  getUsuarioListener() {
    return this.usuarioActualizado.asObservable();
  }

  /* Para Sucursales */
  getSucursalListener() {
    return this.sucursalActualizado.asObservable();
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// AGREGAR CATEGORIA //////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
agregarCategoria(
  codigo: string,
  nombre: string
) {

  /////////////////////////////////////////////////////////////
  /* Se ingesan los datos listos para ir a la BD */
  const datosCategoria: Categorias = {
    COD_CATEGORIA: codigo,
    NOMBRE_CATEGORIA: nombre
  };

  console.log(datosCategoria);

  /* Se envian los datos al servidor 3000 hacia rutas.js para despues enviarlos a la BD */
  this.http.post<{ message: string }>('http://localhost:3000/api/posts/inicio/ingreso_categoria', datosCategoria)
  .subscribe(respuesta => {
      console.log('Estoy en el ingresar service: ', respuesta.message);
      this.categorias.push(datosCategoria);
      this.categoriaActualizado.next([...this.categorias]); /* Se envia una copia del array */
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// AGREGAR PRESENTACION ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
agregarPresentacion(
  id: number,
  nombre: string
) {

  /////////////////////////////////////////////////////////////
  /* Se ingesan los datos listos para ir a la BD */
  const datosPresentacion: Presentacion = {
    ID_PRESENTACION: id,
    NOMBRE_PRESENTACION: nombre
  };

  console.log(datosPresentacion);

  /* Se envian los datos al servidor 3000 hacia rutas.js para despues enviarlos a la BD */
  this.http.post<{ message: string }>('http://localhost:3000/api/posts/inicio/ingreso_presentacion', datosPresentacion)
  .subscribe(respuesta => {
      console.log('Estoy en el ingresar service: ', respuesta.message);
      this.presentacion.push(datosPresentacion);
      this.presentacionActualizado.next([...this.presentacion]); /* Se envia una copia del array */
  });
}



}
