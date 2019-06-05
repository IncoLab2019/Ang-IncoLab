import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicioIngresar } from 'src/app/Servicios/ingresar.service';

@Component({
  selector: 'app-ingreso-sucursales',
  templateUrl: './ingreso-sucursales.component.html',
  styleUrls: ['./ingreso-sucursales.component.scss']
})
export class IngresoSucursalesComponent implements OnInit {

  model: any = {};

  constructor(public servicioIngresar: ServicioIngresar) {}

  ngOnInit() {}

datosModal(form: NgForm) {
   this.servicioIngresar.agregarSucursal(
     form.value.idSucursal,
     form.value.nombre,
     form.value.telefono,
     form.value.direccion
   );

   form.resetForm();
 }

}
