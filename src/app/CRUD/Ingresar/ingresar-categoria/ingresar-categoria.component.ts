import { OnInit, Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ServicioIngresar } from 'src/app/Servicios/ingresar.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { NbAccessChecker } from '@nebular/security';


@Component({
  selector: 'app-ingresar-categoria',
  templateUrl: './ingresar-categoria.component.html',
  styleUrls: ['./ingresar-categoria.component.scss']
})
export class IngresarCategoriaComponent implements OnInit {

  modalRef: BsModalRef;
  model: any = {};

  constructor(public servicioIngresar: ServicioIngresar, public accessChecker: NbAccessChecker) {}

  ngOnInit() {
  }

  ingresarCategoria(form: NgForm) {
      this.servicioIngresar.agregarCategoria(
        form.value.codigo,
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
      title: 'El producto a sido agregado'
    });
  }
}

