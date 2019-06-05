const gConDB = require('../conexionBD/conexionBD');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// INGRESO DE SUCURSALES //////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.ingresoSucursal = (req, res) => {
  /* Contiene los datos que se ingresan desde el formulario */
  const oDatos = req.body;

  gConDB.query(
    'CALL SpIngresarSucursales(?,?,?,?)',
    [ oDatos.ID_SUCURSAL,
      oDatos.NOMBRE,
      oDatos.DIRECCION,
      oDatos.TELEFONO
    ], (err) => {
      if (err) {
        console.log("Fallo al ingresar los datos de sucursal, error: " + err);
      } else {
        res.status(201).json({
          message: 'Datos de sucursal ingresados exitosamente!!'
        });
      }
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// MÉTODO PARA REACTIVAR UNA SUCURSAL ////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.reactivarSucursal =  (req, res) =>  {
  /* Contiene el ID de la sucursal que se quiere reactivar desde la tabla */
  const id = req.params.id;

  /* Se llama el SP de de reactivar */
  gConDB.query('CALL SpReactivarSucursal(?)',
   [ id ], (err) => {
      if(err){
        console.log("Fallo en la reactivación de la sucursal:" + err);
      } else {
        res.status(201).json({ // Respuesta que se envia en caso de exito
          message: 'Sucursal reactivada correctamente'
        });
      }
  });
};
