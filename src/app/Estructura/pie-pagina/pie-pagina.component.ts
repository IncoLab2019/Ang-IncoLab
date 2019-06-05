import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-pagina', // identificador
  styleUrls: ['./pie-pagina.component.scss'], // estilos
  template: `
    <span class="created-by">Laboratorios Cartin IncoLab &copy; 2018. Todos los derechos reservados.
      <a [routerLink]="['/acerca-de']" routerLinkActive="router-link-active">Acerca de</a>
    </span>
  `, // se digita directamente el contenido del componente
})
export class PiePaginaComponent implements OnInit {  // se exporta para emplearlo en otros componentes

  constructor() { }

  ngOnInit() {
  }

}
