/* Se llama la conexion de la base de datos */
const gConDB = require('../conexionBD/conexionBD');


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// INGRESO DE CATEGORIAS ///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//método para ingresar las categorias
exports.ingresoCategoria = (req, res) =>{

    //variable que alamacena los datos obtenidos desde el formulario
    const oDatos = req.body;

    //conexión a la DB
    gConDB.query(
        'CALL SpInsertarCategoria(?,?)',
        [
            oDatos.COD_CATEGORIA,
            oDatos.NOMBRE_CATEGORIA
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