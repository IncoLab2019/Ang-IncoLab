import { AbstractControl } from '@angular/forms';


export function productoVa (control: AbstractControl): { [key: string]: any } | null {
  const valid = /[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+/.test(control.value);
  return valid ? null : { productoInvalido: { valid: false, value: control.value } };
}

export function codigoVa (control: AbstractControl): { [key: string]: any } | null {
  const valid = /[A-Z]{3}-[0-9]{2,3}/.test(control.value);
  return valid ? null : { codigoInvalido: { valid: false, value: control.value } };
}

export function unidadVa (control: AbstractControl): { [key: string]: any } | null {
  const valid = /[-+]?[0-9]*\.?[0-9]+\s]+/.test(control.value);
  return valid ? null : { unidadInvalido: { valid: false, value: control.value } };
}

export function costoVa (control: AbstractControl): { [key: string]: any } | null {
  const valid = /[-+]?[0-9]*\.?[0-9]+/.test(control.value);
  return valid ? null : { costoInvalido: { valid: false, value: control.value } };
}

export function estadoVa (control: AbstractControl): { [key: string]: any } | null {
  const valid = /[-+]?[0-9]*\.?[0-9]+/.test(control.value);
  return valid ? null : { estadoInvalido: { valid: false, value: control.value } };
}
