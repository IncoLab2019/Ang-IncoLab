export interface ProductoTabla {
  NOMBRE_SUB_CATEGORIA: string;
  COD_PRODUCTO: string;
  NOMBRE_PRODUCTO: string;
  NOMBRE_PRESENTACION: string;
  UNIDADES: string;
  TOTAL_UNITARIO: number;
  CANTIDAD_STOCK: number;
  CANTIDAD_USO: number;
  COSTO_TOTAL_PRODUCTO: number;
  COSTO_UNITARIO: number;
  FECHA: string;
  ESTADO_CRITICO: string;
}

/**
  Interfaz para  crear la estructura a la hora de obtener los datos.
  deben ir en mayuscula ya que cuando se realiza la consulta,
  las claves vienen dadas en mayusculas.
**/
