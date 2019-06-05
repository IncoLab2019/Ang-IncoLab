/* importanción de dependencias */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Proveedor } from '../../../models/proveedores.model';
import { Categorias } from '../../../models/categorias.model';
import { Presentacion } from '../../../models/presentacion.model';
import { Unidades } from '../../../models/unidades.model';
import { SubCategoria } from '../../../models/subcategoria.model';

import { ServicioMostrar } from 'src/app/Servicios/mostrar.datos.service';
import { ProductosModificar } from 'src/app/models/producto.modificar.model';
import { ServicioModificar } from 'src/app/Servicios/modificar.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-producto', //identificador del componente
  templateUrl: './modificar-producto.component.html', //estructura del componente
  styleUrls: ['./modificar-producto.component.scss']  //estilos del componente
})
export class ModificarProductoComponent implements OnInit, OnDestroy {  //se exporta para poder implementarla en otros componentes

    model: any = {};
    form: FormGroup;

    //arrays para los elementos que se precargan
    proveedores: Proveedor[];
    categorias: Categorias[];
    presentaciones: Presentacion[];
    unidades: Unidades[];
    subcategorias: SubCategoria[];
    productos: ProductosModificar[];

    //elementos corresponientes a los datos del formulario
    private proveedorSub: Subscription;
    private categoriaSub: Subscription;
    private presentacionSub: Subscription;
    private unidadesSub: Subscription;
    private subcategoriaSub: Subscription;

    private id: string; // para guardar el ID que esta en la URL
    private objeto: any; // Guarda todo el objeto que trae el SP para mostrar los datos a modificar
    private subcategoria_: string;
    private proveedor_: string;
    private categoria_: string;

  constructor(public servicioMostrar: ServicioMostrar, public servicioModificar: ServicioModificar, public route: ActivatedRoute) { }

  ngOnInit() {
     this.obtenerDatosDefecto();
    // Se inicializa el formulario
    this.form = new FormGroup({
      producto: new FormControl(null, { validators: [Validators.required] }),
      codigo: new FormControl(null, { validators: [Validators.required ] }),
      categoria: new FormControl(null, {}),
      subcategoria: new FormControl(null, {}),
      presentacion: new FormControl(null, {}),
      unidad: new FormControl(null, { validators: [Validators.required ] }),
      unidadpresentacion: new FormControl(null, {}),
      costo: new FormControl(null, { validators: [Validators.required] }),
      moneda: new FormControl(null, { validators: [Validators.required] }),
      stock: new FormControl(null, { validators: [Validators.required] }),
      enuso: new FormControl(null, { validators: [Validators.required] }),
      estado: new FormControl(null, {}),
      fechaVencimiento: new FormControl(null, { validators: [Validators.required] }),
      proveedor: new FormControl(null, {}),
      descripcion: new FormControl(null, { validators: [Validators.required ] })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {  //subscribe es similar a un listener

      if (paramMap.has('id')) {
        this.id = paramMap.get('id');
        this.servicioMostrar.obtenerDatosModificar(this.id) //carga los datos asociados al id ingresado
        .subscribe(responseData => {
          console.log('Se ingresaron datos al servicio', responseData.message);
          this.productos = responseData.datos;

          // recorre el objeto que viene de la base para poder acceder a los datos dentro de este
          for (const producto of this.productos) {
            this.objeto = producto;
          }

          // Para mostrar nombre de proveedores
          for (const proveedor of this.proveedores) {
            if (this.objeto.ID_PROVEEDOR === proveedor.ID_PROVEEDOR) {
              this.proveedor_ = proveedor.NOMBRE_PROVEEDOR;
            }
          }

          // Para mostrar nombre de subcategorias
          for (const subcategoria of this.subcategorias) {
            if (this.objeto.COD_SUB_CATEGORIA === subcategoria.COD_SUB_CATEGORIA) {
              this.subcategoria_ = subcategoria.NOMBRE_SUB_CATEGORIA;
            }
          }

          // Para mostrar nombre de categorias
          for (const categoria of this.categorias) {
            if (this.objeto.COD_CATEGORIA === categoria.COD_CATEGORIA) {
              this.categoria_ = categoria.NOMBRE_CATEGORIA;
            }
          }

          this.form.setValue({
            producto: this.objeto.NOMBRE_PRODUCTO,
            codigo: this.objeto.COD_PRODUCTO,
            categoria: this.categoria_,
            subcategoria: this.subcategoria_,
            presentacion: this.objeto.NOMBRE_PRESENTACION,
            unidad: this.objeto.UNIDADES,
            unidadpresentacion: this.objeto.NOMBRE_UNIDAD,
            costo: this.objeto.COSTO_TOTAL_PRODUCTO,
            moneda: 'colones',
            stock: this.objeto.STOCK,
            enuso: this.objeto.ENUSO,
            estado: this.objeto.ESTADO_CRITICO,
            fechaVencimiento: this.objeto.FECHA,
            proveedor: this.proveedor_,
            descripcion: this.objeto.DESCRIPCION,
          });
        });
      }
    });
  }

  /* método para cargar los valores por defecto que se emplearán */
  obtenerDatosDefecto() {
    this.servicioMostrar.obtenerDatosDefecto();

      /*se inicia el listener para la modificación de los elementos */
    this.subcategoriaSub = this.servicioMostrar.getSubCategoriaListener()
    .subscribe((subcategoria: SubCategoria[]) => {
        this.subcategorias = subcategoria; //se asigna la variable para registrar cambios
    },
    (error) => {
      console.log('Error es: ', error); /*en caso de error */
    });

    this.proveedorSub = this.servicioMostrar.getProveedoresListener()
    .subscribe((proveedores: Proveedor[]) => {
      this.proveedores = proveedores;
    },
    (error) => {
      console.log('Error es: ', error);
    });

    this.categoriaSub = this.servicioMostrar.getCategoriaListener()
      .subscribe((categorias: Categorias[]) => {
        this.categorias = categorias;
    },
    (error) => {
      console.log('Error es: ', error);
    });

    this.unidadesSub = this.servicioMostrar.getUnidadListener()
    .subscribe((unidades: Unidades[]) => {
      this.unidades = unidades;
    },
    (error) => {
      console.log('Error es: ', error);
    });

    this.presentacionSub = this.servicioMostrar.getPresentacionListener()
    .subscribe((presentacion: Presentacion[]) => {
        this.presentaciones = presentacion;
    },
    (error) => {
      console.log('Error es: ', error);
    });

  }

  modificarProducto() {
    if (this.form.invalid) {
      return;
    }

    /*se pasan por parámetros los valores presentes en los elementos del formulario*/
    this.servicioModificar.modificarProducto(
      this.form.value.codigo,
      this.form.value.producto,
      this.form.value.categoria,
      this.form.value.subcategoria,
      this.form.value.costo,
      this.form.value.fechaVencimiento,
      this.form.value.proveedor,
      this.form.value.descripcion,
      this.form.value.presentacion,
      this.form.value.unidadpresentacion,
      this.form.value.unidad,
      this.form.value.moneda,
      this.form.value.stock,
      this.form.value.enuso,
      this.form.value.estado
    );
  }

    /*se cierra la "atención" que estaba teniendo cada elemento (similar a un listener u observer) */
  ngOnDestroy() {
    this.proveedorSub.unsubscribe();
    this.categoriaSub.unsubscribe();
    this.presentacionSub.unsubscribe();
    this.unidadesSub.unsubscribe();
    this.subcategoriaSub.unsubscribe();
  }

  modalSwal() {
    this.modificarProducto();
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000,

    });
    Toast.fire({
      type: 'success',
      title: 'El producto ' + this.form.value.producto + ' a sido modificado'
    });
  }
}
