/* Se llama la conexion de la base de datos */
const gConDB = require('../conexionBD/conexionBD');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// INGRESO DE PROVEEDORES /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.ingresoProveedor = (req, res) =>{
  /* Contiene los datos que se ingresan desde el formulario */
  const oDatos = req.body;

  gConDB.query(
    'CALL SpIngresarProveedores(?,?,?,?,?)',
    [ oDatos.ID_PROVEEDOR,
      oDatos.NOMBRE_PROVEEDOR,
      oDatos.DESCRIPCION,
      oDatos.TELEFONO,
      oDatos.CORREO
    ], (err) => {
      if (err) {
        console.log("Fallo al ingresar los datos de proveedor, error: " + err);
      } else {
        res.status(201).json({
          message: 'Datos de proveedor ingresados exitosamente!!'
        });
      }
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// MÉTODO PARA REACTIVAR UN PRODUCTO /////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.reactivarProveedor =  (req, res) =>  {
  /* Contiene el ID del proveedor que se quiere reactivar desde la tabla */
  const id = req.params.id;

  /* Se llama el SP de reactivar */
  gConDB.query('CALL SpReactivarProveedor(?)',
   [ id ], (err) => {
      if(err){
        console.log("Fallo en la reactivación del proveedor:" + err);
      } else {
        res.status(201).json({ // Respuesta que se envia en caso de exito
          message: 'Proveedor reactivado correctamente'
        });
      }
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// MÉTODO PARA DESACTIVAR UN PROVEEDOR ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.desactivarProveedor =  (req, res) =>  {
  /* Contiene el ID del proveedor que se quiere desactivar desde la tabla */
  const id = req.params.id;

  /* Se llama el SP de desactivar */
  gConDB.query('CALL SpDesactivarProveedor(?)',
   [ id ], (err) => {
      if(err){
        console.log("Fallo en la eliminación del proveedor:" + err);
      } else {
        res.status(201).json({ // Respuesta que se envía en caso de exito
          message: 'Proveedor desactivado correctamente'
        });
      }
  });
};