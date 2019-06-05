import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicioReactivar } from '../../../Servicios/reactivar.service';
import { ServicioMostrar } from '../../../Servicios/mostrar.datos.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/models/usuarios.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-inactivos',
  template: `
        <nb-layout>
                <nb-layout-header fixed>
                    <app-encabezado></app-encabezado>
                </nb-layout-header>
                <nb-layout-column>
                    <ng2-smart-table
                     [settings]="settings"
                     [source]="usuarios"
                     (custom)="reactivarUsuario($event)">
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
export class UsuariosInactivosComponent implements OnInit {

  /* usuarios */
  usuarios: Usuarios[]; /* almacenará los usuarios que se mostrarán en la tabla */
  private usuarioSub: Subscription;
  settings = {
    actions: {
      edit: false,
        delete: false,
        add: false,
        position: 'right', // left|right
        custom: [{ name: 'routeToAPage', title: '<i class="ion-md-create"></i>'}]
    },
    /* estructura de la tabla */
    columns: {
      ID_RESPONSABLE: {
        title: 'Identificación',
      },
      NOMBRE_USUARIO: {
        title: 'Nombre',
      },
      CONTRASENNA: {
        title: 'Contraseña',
      },
      FECHA: {
        title: 'Fecha',
      },
      ESTADO: {
        title: 'Estado'
      }
    },
  };

  constructor(
    public servicioReactivar: ServicioReactivar,
    public servicioMostrar: ServicioMostrar,
    public router: Router
  ) {}

  ngOnInit() {
    this.obtenerUsuarios();
  }

/* se cargan los datos en la tabla */
  obtenerUsuarios() {
    this.servicioMostrar.obtenerTablaUserIn();
    this.usuarioSub = this.servicioMostrar.getUsuarioListener()
    .subscribe((tabla: Usuarios[]) => {
      this.usuarios = tabla;
    },
    (error) => {
      console.log('Error es: ', error);
    });
  }

  reactivarUsuario(event) {
    Swal.fire({
      title: '¿Desea volver a activar el producto?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Activar'
    }).then((result) => {
      if (result.value) {
        this.servicioReactivar.reactivarUsuario(event.data.COD_PRODUCTO)
          .subscribe(responseData => {
            console.log('se ingresaron datos al servicio', responseData.message);
            this.servicioMostrar.obtenerTablaUserIn();
        });
        Swal.fire(
          'Producto activado',
          '',
          'success'
        );
      }
    });
  }

  ngOnDestroy() {
    this.usuarioSub.unsubscribe();
  }
}


