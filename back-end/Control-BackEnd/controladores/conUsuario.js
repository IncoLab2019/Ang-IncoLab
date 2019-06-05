const gConDB = require('../conexionBD/conexionBD');


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// INGRESO DE USUARIOS //////////// ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.ingresoUsuario = (req, res) =>{

  const oDatos = req.body;

  /* Aqui se trabaja con los querys para ingreso de datos.
  El ; se utiliza para poder trabajar con diferentes querys, utilizando ademas la sentencia: multipleStatements: true
  a la hora de iniciar la conexion con la BD. */
  gConDB.query(
    'CALL SpIngresarUsuarios(?,?,?,?)',
    [ 'RES-01',
      oDatos.NOMBRE_USUARIO,
      oDatos.CONTRASENNA,
      oDatos.FECHA
    ], (err) => {
      if (err) {
        console.log("Fallo al ingresar los datos de usuario, error: " + err);
    } else {
      res.status(201).json({
        message: 'Datos de usuario ingresados exitosamente!!'
      });
    }
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// MÉTODO PARA REACTIVAR UN USUARIO /////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.reactivarUsuario =  (req, res) =>  {
  /* Contiene el ID del usuario que se quiere reactivar desde la tabla */
  const id = req.params.id;

  /* Se llama el SP de de reactivar */
  gConDB.query('CALL SpReactivarUsuario(?)',
   [ id ], (err) => {
      if(err){
        console.log("Fallo en la reactivación del usuario:" + err);
      } else {
        res.status(201).json({ // Respuesta que se envia en caso de exito
          message: 'usuario reactivado correctamente'
        });
      }
  });
};