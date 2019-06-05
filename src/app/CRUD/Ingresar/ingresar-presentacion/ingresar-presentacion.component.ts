import { OnInit, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ServicioIngresar } from 'src/app/Servicios/ingresar.service';

@Component({
  selector: 'app-ingresar-presentacion',
  templateUrl: './ingresar-presentacion.component.html',
  styleUrls: ['./ingresar-presentacion.component.scss']
})
export class IngresarPresentacionComponent implements OnInit {


  model: any = {};

  constructor(public servicioIngresar: ServicioIngresar) {}

  ngOnInit() {
  }

  datosModal(form: NgForm){
    this.servicioIngresar.agregarPresentacion(
      form.value.idPresentacion,
      form.value.nombre
    );
    this.modalSwal();
    form.resetForm();
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
      title: 'La presentación a sido agregada'
    });
  }
  
}
