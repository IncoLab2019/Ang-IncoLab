/* Este archivo se encarga de importar todas las dependencias
   necesarias para el desarrollo del proyecto  */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDialogModule,
          MatAutocompleteModule,
          MatButtonModule,
          MatCardModule,
          MatInputModule,
          MatDatepickerModule,
          MatRadioModule,
          MatNativeDateModule } from '@angular/material';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { BarraMenuComponent } from './Estructura/barra-menu/barra-menu.component';
import { AcercaDeComponent } from './Estructura/acerca-de/acerca-de.component';
import { EncabezadoComponent } from './Estructura/encabezado/encabezado.component';
import { PiePaginaComponent } from './Estructura/pie-pagina/pie-pagina.component';
import { TablaIngresarComponent } from './Funciones/tabla-ingresar/tabla-ingresar.component';
import { IngresoProductoManualComponent } from './CRUD/Ingresar/ingreso-producto-manual/ingreso-producto-manual.component';
import { IngresoSucursalesComponent } from './CRUD/Ingresar/ingreso-sucursales/ingreso-sucursales.component';
import { IngresoTipoExamenComponent } from './CRUD/Ingresar/ingreso-tipo-examen/ingreso-tipo-examen.component';
import { IngresoUsuariosComponent } from './CRUD/Ingresar/ingreso-usuarios/ingreso-usuarios.component';
import { ModificarProductoComponent } from './CRUD/Modificar/modificar-producto/modificar-producto.component';
import { DesactivarProductoComponent } from './CRUD/Desactivar/desactivar-producto/desactivar-producto.component';
import { DesactivarSucursalComponent } from './CRUD/Desactivar/desactivar-sucursal/desactivar-sucursal.component';
import { DesactivarTiposExamenesComponent } from './CRUD/Desactivar/desactivar-tipos-examenes/desactivar-tipos-examenes.component';
import { PermisosUsuarioComponent } from './Accesos/permisos-usuario/permisos-usuario.component';
import { ReportesComponent } from './Funciones/reportes/reportes.component';
import { AyudaComponent } from './Estructura/ayuda/ayuda.component';
import { InicioComponent } from './Estructura/inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IngresarProveedoresComponent } from './CRUD/Ingresar/ingresar-proveedores/ingresar-proveedores.component';
import { NbThemeModule, NbLayoutModule, NbSidebarModule,NbCheckboxModule, NbMenuModule, NbCardModule, NbAlertModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TablaProveedoresDesactivadosComponent } from './CRUD/Visualizar/tabla-proveedores-desactivados/tabla-proveedores-desactivados.component';
import { TablaProductosDesactivadosComponent } from './CRUD/Visualizar/tabla-productos-desactivados/tabla-productos-desactivados.component';
import { UsuariosInactivosComponent } from './CRUD/Visualizar/tabla-usuarios-desactivados/usuarios-inactivos.component';
import { SucursalesInactivasComponent } from './CRUD/Visualizar/sucursales-inactivas/sucursales-inactivas.component';
import { IngresarCategoriaComponent } from './CRUD/Ingresar/ingresar-categoria/ingresar-categoria.component';
import { IngresarPresentacionComponent } from './CRUD/Ingresar/ingresar-presentacion/ingresar-presentacion.component';
import { TablaProductosAcabarseComponent } from './CRUD/Visualizar/tabla-productos-acabarse/tabla-productos-acabarse.component';
import { TablaProductosVencerComponent } from './CRUD/Visualizar/tabla-productos-vencer/tabla-productos-vencer.component';
import { ServicioIngresar } from './Servicios/ingresar.service';
import { ServicioMostrar } from './Servicios/mostrar.datos.service';
import { EnvioDatosService } from './Servicios/envioDatos.service';
import { ServicioDesactivar } from './Servicios/desactivar.service';
import { ServicioModificar } from './Servicios/modificar.service';
import { ManejoErrores } from './Servicios/manejoErrores.service';
import { ServicioReporte } from './Servicios/reporte.service';
import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken } from '@nebular/auth';
import { of as observableOf } from 'rxjs/observable/of';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { RoleProvider } from './auth/role.provider';

// Paa reportes
import { CommonModule } from '@angular/common';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { GraficosComponent } from './Funciones/reportes/graficos/grafico.component';

PlotlyModule.plotlyjs = PlotlyJS;


import { MatIconModule, MatTableModule } from '@angular/material'; /* Para tabla de reportes */
import { ExporterService } from './Servicios/exporter.service';

@NgModule({
  declarations: [  /* identificadores de cada componente (selector) */
    AppComponent,
    BarraMenuComponent,
    InicioComponent,
    AcercaDeComponent,
    EncabezadoComponent,
    PiePaginaComponent,
    TablaIngresarComponent,
    IngresoProductoManualComponent,
    IngresoSucursalesComponent,
    IngresoTipoExamenComponent,
    IngresoUsuariosComponent,
    ModificarProductoComponent,
    DesactivarProductoComponent,
    DesactivarSucursalComponent,
    DesactivarTiposExamenesComponent,
    PermisosUsuarioComponent,
    ReportesComponent,
    AyudaComponent,
    InicioComponent,
    IngresarProveedoresComponent,
    TablaProductosDesactivadosComponent,
    TablaProveedoresDesactivadosComponent,
    UsuariosInactivosComponent,
    SucursalesInactivasComponent,
    IngresarCategoriaComponent,
    IngresarPresentacionComponent,
    TablaProductosAcabarseComponent,
    TablaProductosVencerComponent,
    GraficosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatNativeDateModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    Ng2SmartTableModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbSidebarModule,
    NbCardModule,
    NbAlertModule,
    NbCheckboxModule,
    CommonModule,
    PlotlyModule,
    NbMenuModule.forRoot(),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://localhost:3000/api/posts',
          login: {
            endpoint: '/auth/login',
            defaultErrors: ['Usuario o contraseña incorrecto'],
            defaultMessages: null,
            redirect: {
              success: '/inicio',
              failure: null,
            }
          },
          logout: {
            endpoint: '/auth/logout',
            redirect: {
              success: '/auth/login',
              failure: null,
            }
          },
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          }
        }),
      ],
      forms: {},
    }),
    NbSecurityModule.forRoot({
      accessControl: {
        OTR: {
          view: 'ver',
        },
        TEC: {
          create: 'ingresar',
          update: 'modificar'
        },
        MIC: {
          parent: 'TEC',
          remove: '*',
        },
        SEC: {
          parent: 'TEC'
        },
        ADM: {
          parent: 'TEC',
          create: 'usuarios',
          view: 'ver',
        }
      },
    }),
    MatIconModule, 
    MatTableModule
  ],
  providers: [
    ServicioIngresar,
    ServicioDesactivar,
    ServicioModificar,
    ServicioMostrar,
    ServicioReporte,
    EnvioDatosService,
    ManejoErrores,
    { provide: NbRoleProvider, useClass: RoleProvider },
    ExporterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
