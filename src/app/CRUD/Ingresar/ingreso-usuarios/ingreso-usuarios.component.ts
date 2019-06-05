import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicioIngresar } from 'src/app/Servicios/ingresar.service';

@Component({
  selector: 'app-ingreso-usuarios',
  templateUrl: './ingreso-usuarios.component.html',
  styleUrls: ['./ingreso-usuarios.component.scss']
})
export class IngresoUsuariosComponent implements OnInit {

  model: any = {};

  constructor(public servicioIngresar: ServicioIngresar) {}


  ngOnInit() {
  }

datosModal(form: NgForm) {
   this.servicioIngresar.agregarUsuarios(
      form.value.idResponsable,
      form.value.nombre,
      form.value.contrasenna,
    );

    form.resetForm();
  }

}
