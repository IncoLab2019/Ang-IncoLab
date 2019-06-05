import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ServicioReactivar {

  constructor(
    private http: HttpClient
  ) {}

////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// REACTIVAR SUCURSALES INACTIVAS /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
  reactivarSucursal(id: string) {
    return this.http
      .get<{ message: string}>(
        'http://localhost:3000/api/posts/inicio/reactivarSucursal/' + id);
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// REACTIVAR PRODUCTOS ///////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
  reactivarProducto(id: string) {
    return this.http
      .get<{ message: string}>(
        'http://localhost:3000/api/posts/inicio/reactivar/' + id);
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// REACTIVAR PROVEEDOR ////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
  reactivarProveedor(id: string) {
    return this.http
      .get<{ message: string}>(
        'http://localhost:3000/api/posts/inicio/reactivarProveedor/' + id);
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// REACTIVAR USUARIOS INACTIVOS ///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

  reactivarUsuario(id: string) {
    return this.http
      .get<{ message: string}>(
        'http://localhost:3000/api/posts/inicio/reactivarUsuario/' + id);
  }

}
