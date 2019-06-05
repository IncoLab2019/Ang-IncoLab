/* Se llama la conexion de la base de datos */
const gConDB = require('../conexionBD/conexionBD');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// INGRESO DE PRODUCTOS MANUAL /////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** Metodo para guardar datos desde la ventana de ingresar a la BD **/
exports.ingresoProductoManual = (req, res) => {

    /* Esta constante guarda los datos que se obtienen desde el formulario de ingreso de productos. */
    const oDatos = req.body;
    console.log(oDatos);
    /* Se llama al procedimiento almacenado, ingresando los datos necesarios. */
    gConDB.query(
      'CALL SpInsertarProducto(?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [
        oDatos.COD_PRODUCTO,
        oDatos.NOMBRE_PRODUCTO,
        oDatos.COD_CATEGORIA,
        oDatos.COD_SUB_CATEGORIA,
        oDatos.COSTO_TOTAL_PRODUCTO,
        oDatos.FECHA_VENCIMIENTO,
        oDatos.ID_PROVEEDOR,
        oDatos.DESCRIPCION,
        oDatos.ESTADO_CRITICO,
        oDatos.PRESENTACION,
        oDatos.UNIDADES_PRESENTACION,
        oDatos.UNIDADES,
        oDatos.MONEDA
      ], (err) => {
        if (err) {
          return res.status(404).json({ message: 'Ocurrio un error a la hora de ingresar los datos'})
        } else {
          /* Se envia una respuesta en caso de exito */
          return res.status(200).json({ message: 'Datos ingresados exitosamente!!' });
      }
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// MODIFICACION DE PRODUCTOS MANUAL (DESDE FORMULARIO) ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.modificarProductoManual = (req, res) => {
  /* Datos modificados desde el formulario */
  const oDatos = req.body;

  /* Llamada del SP, se colocan en el orden que tiene el SP */
  gConDB.query('CALL SpModificarProducto(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
  [ oDatos.COD_PRODUCTO,
    oDatos.NOMBRE_PRODUCTO,
    oDatos.COD_CATEGORIA,
    oDatos.COD_SUB_CATEGORIA,
    oDatos.COSTO_TOTAL_PRODUCTO,
    oDatos.FECHA_VENCIMIENTO,
    oDatos.ID_PROVEEDOR,
    oDatos.STOCK,
    oDatos.ENUSO,
    oDatos.ESTADO_CRITICO,
    oDatos.DESCRIPCION,
    oDatos.ID_PRESENTACION,
    oDatos.ID_UNIDADES_PRESENTACION,
    oDatos.UNIDADES
  ], (err) => {
    if (err) {
      console.log("Fallo al modificar los datos, error: " + err);
    } else {
      res.status(201).json({ // Respuesta que se envia en caso de exito
        message: 'Datos modificados exitosamente!!'
      });
    }
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// PARA DESACTIVACION DE DATOS ////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.desactivarProducto =  (req, res) =>  {
  /* Contiene el ID del producto que se quiere desactivar desde la tabla */
  const id = req.params.id;

  /* Se llama el SP de desactivar */
  gConDB.query('CALL SpDesactivarProducto(?)',
   [ id ], (err) => {
      if(err){
        console.log("Fallo en la eliminación del producto:" + err);
      } else {
        res.status(201).json({ // Respuesta que se envia en caso de exito
          message: 'Producto eliminado correctamente'
        });
      }
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// LLAMA DATOS QUE SE DEBEN CARGAR POR DEFECTO //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.obtenerDatosPorDefecto = (req, res) => {

  const script = "CALL SpListarCategorias(); CALL SpListarProveedores(); CALL SpListarSubCategorias(); CALL SpListarPresentaciones(); CALL SpListarUnidadesPresentacion()";

  gConDB.query(script, (err,result) => {
    if (err) {
      console.log("Error en el SELECT de datos defecto: " + err);
    }
    /* Se crea una constante que va a almacenar el array con los objetos */
    /* Se parsea a JSON para que no hayan problemas con los tipos de array que se obtienen desde la BD */
    const categorias = JSON.parse(JSON.stringify(result[0]));
    const proveedores = JSON.parse(JSON.stringify(result[2]));
    const subcategoria = JSON.parse(JSON.stringify(result[4]));
    const presentacion = JSON.parse(JSON.stringify(result[6]));
    const unidades = JSON.parse(JSON.stringify(result[8]));

    res.status(200).json({
      message: 'Solicitud exitosa!!',
      categorias: categorias,
      proveedores: proveedores,
      subcategoria: subcategoria,
      presentacion: presentacion,
      unidades: unidades
    });
  });
};

exports.obtenerListaProductos = (req, res) => {
  gConDB.query('SpListarNombreProductos()', (err, result) => {
    if(err){
      return res.status(404);
    } else {
      const productos = JSON.parse(JSON.stringify(result[0]));
      return res.status(200).json({
        productos: productos
        });
    }
  })
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////// LLAMA LOS DATOS QUE SE NECESITAN CARGAR CUANDO SE VA A MODIFICAR UN PRODUCTO ///////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.obtenerDatosDeProductoModificar = (req, res) => {
  const x = req.params.id;

  gConDB.query('CALL SpConsultarProductos(?)',
  [ x ], (err, result) => {
    if (err) {
      console.log("Fallo al consultar los datos, error: " + err);
    }

    const datos = JSON.parse(JSON.stringify(result[0]));

    res.status(201).json({
      message: 'Datos obtenidos exitosamente!!',
      datos: datos
    });
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// MÉTODO PARA REACTIVAR UN PRODUCTO /////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.reactivarProducto =  (req, res) =>  {
  /* Contiene el ID del producto que se quiere reactivar desde la tabla */
  const id = req.params.id;

  /* Se llama el SP de de reactivar */
  gConDB.query('CALL SpReactivarProducto(?)',
   [ id ], (err) => {
      if(err){
        console.log("Fallo en la reactivación del producto:" + err);
      } else {
        res.status(201).json({ // Respuesta que se envia en caso de exito
          message: 'Producto reactivado correctamente'
        });
      }
  });
};
