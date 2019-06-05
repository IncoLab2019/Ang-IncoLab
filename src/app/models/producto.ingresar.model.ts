// Interfaz de los tipos de datos que se van a envíar entre
// Angular y Node para la base de datos en MySQL

export interface ProductosIngresar {
  COD_PRODUCTO: string;
  NOMBRE_PRODUCTO: string;
  COD_CATEGORIA: string;
  COD_SUB_CATEGORIA: string;
  COSTO_TOTAL_PRODUCTO: number;
  FECHA_VENCIMIENTO: string;
  ID_PROVEEDOR: string;
  ESTADO_CRITICO: number;
  DESCRIPCION: string;
  PRESENTACION: number;
  UNIDADES_PRESENTACION: number;
  UNIDADES: number;
  MONEDA: string;
}
