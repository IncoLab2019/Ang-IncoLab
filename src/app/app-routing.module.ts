/* este archivo se escarga de establecer las rutas o redirecciones que
se emplearán dentro del proyecto, por ejemplo la navegación del menú o
al acceder algún componente desde otro */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablaIngresarComponent } from './Funciones/tabla-ingresar/tabla-ingresar.component';
import { InicioComponent } from './Estructura/inicio/inicio.component';
import { IngresoProductoManualComponent } from './CRUD/Ingresar/ingreso-producto-manual/ingreso-producto-manual.component';
import { IngresoUsuariosComponent } from './CRUD/Ingresar/ingreso-usuarios/ingreso-usuarios.component';
import { IngresoSucursalesComponent } from './CRUD/Ingresar/ingreso-sucursales/ingreso-sucursales.component';
import { IngresarProveedoresComponent } from './CRUD/Ingresar/ingresar-proveedores/ingresar-proveedores.component';
import { AcercaDeComponent } from './Estructura/acerca-de/acerca-de.component';
import { ModificarProductoComponent } from './CRUD/Modificar/modificar-producto/modificar-producto.component';
import { TablaProductosDesactivadosComponent } from './CRUD/Visualizar/tabla-productos-desactivados/tabla-productos-desactivados.component';
import { TablaProveedoresDesactivadosComponent } from './CRUD/Visualizar/tabla-proveedores-desactivados/tabla-proveedores-desactivados.component';
import { UsuariosInactivosComponent } from './CRUD/Visualizar/tabla-usuarios-desactivados/usuarios-inactivos.component';
import { SucursalesInactivasComponent } from './CRUD/Visualizar/sucursales-inactivas/sucursales-inactivas.component';
import { IngresarCategoriaComponent } from './CRUD/Ingresar/ingresar-categoria/ingresar-categoria.component';
import { IngresarPresentacionComponent } from './CRUD/Ingresar/ingresar-presentacion/ingresar-presentacion.component';
import { TablaProductosVencerComponent } from './CRUD/Visualizar/tabla-productos-vencer/tabla-productos-vencer.component';
import { TablaProductosAcabarseComponent } from './CRUD/Visualizar/tabla-productos-acabarse/tabla-productos-acabarse.component';
import { ReportesComponent } from './Funciones/reportes/reportes.component';
import { NbLogoutComponent } from '@nebular/auth';

import { AuthGuard } from './auth/auth-guard.service';
import { GraficosComponent } from './Funciones/reportes/graficos/grafico.component';

/* rutas que seguirá el sistema, path indica que es una ruta, seguido de un identificador y el componente al cual se dirigirá */
// EXPORT *
export const routes: Routes = [

  {
    path: 'auth',
    loadChildren: './auth/auth.module#NgxAuthModule',
  },
  {
    path: 'logout',
    component: NbLogoutComponent,
  },
  { path: 'inicio', component: InicioComponent },
  { path: 'inicio/tabla', component: TablaIngresarComponent },
  { path: 'inicio/reportes', component: ReportesComponent },
  { path: 'inicio/graficos', component: GraficosComponent },
  { path: 'inicio/ingreso_manual', component: IngresoProductoManualComponent },
  { path: 'inicio/editar/:id', component: ModificarProductoComponent },
  { path: 'inicio/ingresousuarios', component: IngresoUsuariosComponent },
  { path: 'inicio/ingresosucursales', component: IngresoSucursalesComponent },
  { path: 'inicio/ingresosproveedores', component: IngresarProveedoresComponent },
  { path: 'acerca-de', component: AcercaDeComponent},
  { path: 'inicio/productoDesactivado', component: TablaProductosDesactivadosComponent},
  { path: 'inicio/proveedorDesactivado', component: TablaProveedoresDesactivadosComponent},
  { path: 'inicio/usuarioDesactivado', component: UsuariosInactivosComponent},
  { path: 'inicio/sucursalDesactivada', component: SucursalesInactivasComponent},
  { path: 'inicio/ingresoCategoria', component: IngresarCategoriaComponent},
  { path: 'inicio/ingresoPresentacion', component: IngresarPresentacionComponent},
  { path: 'inicio/productosVencer', component: TablaProductosVencerComponent},
  { path: 'inicio/productosAcabarse', component: TablaProductosAcabarseComponent },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
