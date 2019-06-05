import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-barra-menu', //identificador
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './barra-menu.component.html', //estructura
  styleUrls: ['./barra-menu.component.scss']  //estilos
})

export class BarraMenuComponent {
  menu: NbMenuItem[] = [
    {
      title: 'Inicio',
      icon: 'ion-md-home',
      link: '/inicio',
    },
    // Opción ingresar de menú
    {
      title: 'Ingresar',
      icon: 'ion-md-add-circle-outline',
      children: [
        {
          title: 'Producto',
          link: '/inicio/ingreso_manual'
        },
        {
          title: 'Usuario',
          link: '/inicio/ingresousuarios'
        },
        {
          title: 'Proveedor',
          link: '/inicio/ingresosproveedores'
        },
        {
          title: 'Sucursal',
          link: '/inicio/ingresosucursales'
        },
        {
          title: 'Categoría',
          link: '/inicio/ingresoCategoria'
        },
        {
          title: 'Presentación',
          link: '/inicio/ingresoPresentacion'
        },
      ]
    },
    // Opción visualizar: para mostrar la tabla
    {
      title: 'Visualizar',
      icon:  'ion-md-eye',
      children: [
        {
          title: 'Producto',
          link: '/inicio/tabla'
        },
        {
          title: 'Por Vencer',
          link: '/inicio/productosVencer'
        },
        {
          title: 'Por Acabarse',
          link: '/inicio/productosAcabarse'
        }
      ]

    },
    // Opción reportes: para generar informes y gráficos
    {
      title: 'Reportes',
      icon:  'ion-md-stats',
      link: '/inicio/reportes',
    },
    // Opcion inactivos: muestra los datos inactivos en la DB
    {
      title: 'Inactivos',
      icon: 'ion-md-switch',
      children: [
        {
          title: 'Productos',
          link: '/inicio/productoDesactivado'
        },
        {
          title: 'Proveedores',
          link: '/inicio/proveedorDesactivado'
        },
        {
          title: 'Usuarios',
          link: '/inicio/usuarioDesactivado'
        },
        {
          title: 'Sucursales',
          link: '/inicio/sucursalDesactivada'
        },
      ]
    },
    {
      title: 'Logout',
      icon: 'ion-md-power',
      link: '/auth/logout',
    }
  ];
}

