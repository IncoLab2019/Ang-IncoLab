/* Se llama la conexion de la base de datos */
const gConDB = require('../conexionBD/conexionBD');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// INGRESO DE PRESENTACION /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//método para ingresar la presentacion
exports.ingresoPresentacion = (req, res) =>{

    //variable que alamacena los datos obtenidos desde el formulario
    const oDatos = req.body;

    //conexión a la DB
    gConDB.query(
        'CALL SpIngresarPresentacion(?,?)',
        [
            oDatos.ID_PRESENTACION,
            oDatos.NOMBRE_PRESENTACION
        ], (err) => {
            if (err) {
                console.log("Fallo al ingresar los datos! Error: " + err);
              } else {
                /* Se envia una respuesta en caso de exito */
                res.status(201).json({
                message: 'Datos ingresados exitosamente!!'
              });
            }
        });
}
