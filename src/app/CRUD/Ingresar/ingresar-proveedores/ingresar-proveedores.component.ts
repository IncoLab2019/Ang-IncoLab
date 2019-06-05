/*importanción de las dependencias*/
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ServicioIngresar } from 'src/app/Servicios/ingresar.service';

@Component({
  selector: 'app-ingresar-proveedores', //identificador
  templateUrl: './ingresar-proveedores.component.html',  //estructura del componente
  styleUrls: ['./ingresar-proveedores.component.scss']   //estilos del componente
})
export class IngresarProveedoresComponent implements OnInit {

  model: any = {};

  constructor(public servicioIngresar: ServicioIngresar) {}

  ngOnInit() {}

  datosModal(form: NgForm) {
    this.servicioIngresar.agregarProveedor(
      form.value.idProveedor,
      form.value.proveedor,
      form.value.telefono,
      form.value.correo,
      form.value.descripcion
    );
    this.modalSwal();
    form.resetForm();
    // this.modalRef.hide();
  }

  modalSwal() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000,
    });
    Toast.fire({
      type: 'success',
      title: 'El producto a sido agregado'
    });
  }
}
