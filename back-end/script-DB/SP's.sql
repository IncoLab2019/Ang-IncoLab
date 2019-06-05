-- ---------------------------------------------------------------- --
DELIMITER $$
CREATE PROCEDURE SpInsertarProducto(
  IN newCOD_PRODUCTO CHAR(7),
  IN newNOMBRE VARCHAR(120),
  IN newCOD_CATEGORIA CHAR(7),
  IN newSUB_CATEGORIA VARCHAR(120),
  IN newCOSTO_TOTAL_PRODUCTO FLOAT,
  IN newFECHA_VENCIMIENTO DATE,
  IN newID_PROVEEDOR CHAR(7),
  IN newDESCRIPCION VARCHAR(150),
  IN newESTADO_CRITICO INT(11),
  IN newPRESENTACION INT,
  IN newUNIDAD_PRESENTACION INT,
  IN newUNIDADES INT(11),
  IN newMONEDA VARCHAR(2)
)
BEGIN
	Insert into productos values (newCOD_PRODUCTO, newNOMBRE, newCOD_CATEGORIA, newSUB_CATEGORIA,
		newCOSTO_TOTAL_PRODUCTO, newCOSTO_TOTAL_PRODUCTO/newUNIDADES, newFECHA_VENCIMIENTO,
        newID_PROVEEDOR, newUNIDADES, 0, newUNIDADES, newESTADO_CRITICO,
        1, newDESCRIPCION, newMONEDA, newUNIDADES
    );

    INSERT INTO PRESENTACIONES(COD_PRODUCTO,ID_PRESENTACION,ID_UNIDADES_PRESENTACION,UNIDADES)
    VALUES (newCOD_PRODUCTO,newPRESENTACION,newUNIDAD_PRESENTACION,newUNIDADES);
END $$
-- ---------------------------------------------------------------- --
DELIMITER $$
CREATE PROCEDURE SpModificarProducto(
  IN newCOD_PRODUCTO CHAR(7),
  IN newNOMBRE VARCHAR(120),
  IN newCOD_CATEGORIA CHAR(7),
  IN newSUB_CATEGORIA VARCHAR(120),
  IN newCOSTO_TOTAL_PRODUCTO FLOAT,
  IN newFECHA_VENCIMIENTO DATE,
  IN newID_PROVEEDOR CHAR(7),
  IN newCANTIDAD_STOCK INT(4),
  IN newCANTIDAD_USO INT(4),
  IN newESTADO_CRITICO INT(11),
  IN newDESCRIPCION VARCHAR(150),
  IN newPRESENTACION INT,
  IN newUNIDAD_PRESENTACION INT,
  IN newUNIDADES INT(11)
)
BEGIN
	UPDATE PRESENTACIONES C
    SET ID_PRESENTACION = newPresentacion,
		ID_UNIDADES_PRESENTACION = newUnidad_Presentacion,
        UNIDADES = newUnidades
    WHERE C.COD_PRODUCTO = newCOD_PRODUCTO;

	UPDATE PRODUCTOS P
    SET NOMBRE_PRODUCTO = newNOMBRE,
        COD_CATEGORIA = newCOD_CATEGORIA,
        COD_SUB_CATEGORIA = newSUB_CATEGORIA,
        COSTO_TOTAL_PRODUCTO = newCOSTO_TOTAL_PRODUCTO,
        FECHA_VENCIMIENTO = newFECHA_VENCIMIENTO,
		ID_PROVEEDOR = newID_PROVEEDOR,
        CANTIDAD_STOCK = newCANTIDAD_STOCK,
        CANTIDAD_USO = newCANTIDAD_USO,
        ESTADO_CRITICO = newESTADO_CRITICO,
        DESCRIPCION = newDESCRIPCION
	WHERE P.COD_PRODUCTO = newCOD_PRODUCTO;
END $$
-- ---------------------------------------------------------------- --
DELIMITER $$
CREATE PROCEDURE SpMostrarTabla()
BEGIN
	SELECT
		NOMBRE_SUB_CATEGORIA,
		P.COD_PRODUCTO,
		NOMBRE_PRODUCTO,
		NOMBRE_PRESENTACION,
		UNIDADES,
		TOTAL_UNITARIO,
		CANTIDAD_STOCK,
		CANTIDAD_USO,
        MONEDA,
		concat(MONEDA,COSTO_TOTAL_PRODUCTO) AS COSTO_TOTAL_PRODUCTO,
        concat(MONEDA,COSTO_UNITARIO) AS COSTO_UNITARIO,
		date_format(FECHA_VENCIMIENTO, "%d/%m/%Y") AS FECHA
		FROM PRODUCTOS P
		INNER JOIN PRESENTACIONES C
		INNER JOIN SUBCATEGORIAS S
    INNER JOIN PRESENTACION PR
		ON P.COD_PRODUCTO = C.COD_PRODUCTO AND S.COD_SUB_CATEGORIA = P.COD_SUB_CATEGORIA
    AND C.ID_PRESENTACION = PR.ID_PRESENTACION
    WHERE P.ESTADO = 1;
END $$
-- ---------------------------------------------------------------- --
DELIMITER $$
CREATE PROCEDURE SpListarProveedores()
BEGIN
	SELECT
		ID_PROVEEDOR,
		NOMBRE_PROVEEDOR,
		DESCRIPCION,
		TELEFONO,
		CORREO
	FROM PROVEEDORES;
END $$
-- ---------------------------------------------------------------- --
DELIMITER $$
CREATE PROCEDURE SpListarUnidadesPresentacion()
BEGIN
	SELECT
		ID_UNIDADES_PRESENTACION,
		NOMBRE_UNIDAD
	FROM UNIDADES_PRESENTACION;
END $$
-- ---------------------------------------------------------------- --
DELIMITER $$
CREATE PROCEDURE SpListarCategorias()
BEGIN
	SELECT
		COD_CATEGORIA,
		NOMBRE_CATEGORIA
	FROM CATEGORIAS;
END $$
-- ---------------------------------------------------------------- --
DELIMITER $$
CREATE PROCEDURE SpListarPresentaciones()
BEGIN
	SELECT
		ID_PRESENTACION,
		NOMBRE_PRESENTACION
	FROM PRESENTACION;
END $$
-- ---------------------------------------------------------------- --
DELIMITER $$
CREATE PROCEDURE SpListarSubCategorias()
BEGIN
	SELECT
		COD_SUB_CATEGORIA,
		NOMBRE_SUB_CATEGORIA
	FROM SUBCATEGORIAS;
END $$
-- ---------------------------------------------------------------- --
DELIMITER $$
CREATE PROCEDURE SpListarProductos()
BEGIN
	SELECT
		P.COD_PRODUCTO,
		NOMBRE_PRODUCTO,
		COD_CATEGORIA,
		COD_SUB_CATEGORIA,
        PRESENTACION,
        UNIDADES_PRESENTACION,
		UNIDADES,
		COSTO_TOTAL_PRODUCTO,
		date_format(FECHA_VENCIMIENTO, "%d/%m/%Y") AS FECHA,
		ID_PROVEEDOR,
		DESCRIPCION
	FROM PRODUCTOS P
    INNER JOIN PRESENTACIONES C
    WHERE P.COD_PRODUCTO = C.COD_PRODUCTO;
END $$
-- ---------------------------------------------------------------- --
DELIMITER $$
CREATE PROCEDURE SpConsultarProductos(IN newCOD_PRODUCTO CHAR(7))
BEGIN
	SELECT
		P.COD_PRODUCTO,
		NOMBRE_PRODUCTO,
		COD_CATEGORIA,
		COD_SUB_CATEGORIA,
        NOMBRE_PRESENTACION,
        NOMBRE_UNIDAD,
		UNIDADES,
		COSTO_TOTAL_PRODUCTO,
		date_format(FECHA_VENCIMIENTO, "%Y-%m-%d") AS FECHA,
		ID_PROVEEDOR,
		DESCRIPCION,
        CANTIDAD_STOCK AS STOCK,
        CANTIDAD_USO AS ENUSO,
        ESTADO_CRITICO
	FROM PRODUCTOS P
    INNER JOIN PRESENTACIONES C
    INNER JOIN PRESENTACION PR
    INNER JOIN UNIDADES_PRESENTACION U
    WHERE P.COD_PRODUCTO = newCOD_PRODUCTO AND C.COD_PRODUCTO = newCOD_PRODUCTO
    AND C.ID_PRESENTACION = PR.ID_PRESENTACION AND C.ID_UNIDADES_PRESENTACION = U.ID_UNIDADES_PRESENTACION;
END $$
-- ---------------------------------------------------------------- --
DELIMITER $$
CREATE PROCEDURE SpDesactivarProducto(IN pIdProducto CHAR(7))
BEGIN
	UPDATE productos
    SET ESTADO = 0
    WHERE COD_PRODUCTO = pIdProducto;
END $$
-- ---------------------------------------------------------------- --
DELIMITER $$
CREATE PROCEDURE SpModificarTabla(
  IN newCOD_PRODUCTO CHAR(7),
  IN newNOMBRE VARCHAR(120),
  IN newCOSTO_TOTAL_PRODUCTO FLOAT,
  IN newCANTIDAD_STOCK INT(4),
  IN newCANTIDAD_USO INT(4),
  IN newUnidades INT(11)
)
BEGIN
	UPDATE PRESENTACIONES C
    SET UNIDADES = newUnidades
    WHERE C.COD_PRODUCTO = newCOD_PRODUCTO;

	UPDATE PRODUCTOS P
    SET NOMBRE_PRODUCTO = newNOMBRE,
        COSTO_TOTAL_PRODUCTO = newCOSTO_TOTAL_PRODUCTO,
        CANTIDAD_STOCK = newCANTIDAD_STOCK,
        CANTIDAD_USO = newCANTIDAD_USO
    WHERE P.COD_PRODUCTO = newCOD_PRODUCTO;
END $$
-- ---------------------------------------------------------------- --
DELIMITER $$
CREATE PROCEDURE SpIngresarProveedores(
  IN newID_PROVEEDOR CHAR(7),
  IN newNOMBRE_PROVEEDOR VARCHAR(60),
  IN newDESCRIPCION VARCHAR(100),
  IN newTELEFONO VARCHAR(12),
  IN newCORREO VARCHAR(60)
)
BEGIN
	INSERT INTO PROVEEDORES(ID_PROVEEDOR, NOMBRE_PROVEEDOR,DESCRIPCION,TELEFONO,CORREO,ESTADO)
    VALUES(newID_PROVEEDOR, newNOMBRE_PROVEEDOR, newDESCRIPCION, newTELEFONO, newCORREO, 1);
END $$
-- ---------------------------------------------------------------- --
DELIMITER $$
CREATE PROCEDURE SpIngresarSucursales(
  IN newID_SUCURSAL CHAR(7),
  IN newNOMBRE VARCHAR(60),
  IN newDIRECCION VARCHAR(100),
  IN newTELEFONO VARCHAR(12)
)
BEGIN
	INSERT INTO SUCURSALES(ID_SUCURSAL, NOMBRE,DIRECCION,TELEFONO,ESTADO)
    VALUES(newID_PROVEEDOR, newNOMBRE_PROVEEDOR, newDESCRIPCION, newTELEFONO, 1);
END $$
-- ---------------------------------------------------------------- --
DELIMITER $$
CREATE PROCEDURE SpIngresarUsuarios(
  IN newID_RESPONSABLE CHAR(6),
  IN newNOMBRE_USUARIO VARCHAR(30),
  IN newCONTRASENNA VARCHAR(10),
  IN newFECHA datetime
)
BEGIN
	INSERT INTO USUARIOS(ID_RESPONSABLE, NOMBRE_USUARIO, CONTRASENNA,FECHA,ESTADO)
    VALUES(newID_RESPONSABLE, newNOMBRE_USUARIO, newCONTRASENNA, newFECHA, 1);
END $$
-- ---------------------------------------------------------------- --
DELIMITER $$
CREATE PROCEDURE SpReactivarProducto(IN pIdProducto CHAR(7))
BEGIN
	UPDATE productos
    SET ESTADO = 1
    WHERE COD_PRODUCTO = pIdProducto;
END $$
-- ---------------------------------------------------------------- --

DELIMITER $$
CREATE PROCEDURE SpDesactivarProveedor(IN pIdProveedor CHAR(7))
BEGIN
	UPDATE proveedores
    SET ESTADO = 0
    WHERE ID_PROVEEDOR = pIdProveedor;
END $$
-- ---------------------------------------------------------------- --
DELIMITER $$
CREATE PROCEDURE SpReactivarProveedor(IN pIdProveedor CHAR(7))
BEGIN
	UPDATE proveedores
    SET ESTADO = 1
    WHERE ID_PROVEEDOR = pIdProveedor;
END $$

-- ---------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE SpMostrarProductosDesactivados()
BEGIN
	SELECT
		NOMBRE_SUB_CATEGORIA,
		P.COD_PRODUCTO,
		NOMBRE_PRODUCTO,
		NOMBRE_PRESENTACION,
		UNIDADES,
		TOTAL_UNITARIO,
		CANTIDAD_STOCK,
		CANTIDAD_USO,
		COSTO_TOTAL_PRODUCTO,
		date_format(FECHA_VENCIMIENTO, "%d/%m/%Y") AS FECHA
		FROM PRODUCTOS P
		INNER JOIN PRESENTACIONES C
		INNER JOIN SUBCATEGORIAS S
        INNER JOIN PRESENTACION PR
		ON P.COD_PRODUCTO = C.COD_PRODUCTO AND S.COD_SUB_CATEGORIA = P.COD_SUB_CATEGORIA
        AND C.ID_PRESENTACION = PR.ID_PRESENTACION
    WHERE P.ESTADO = 0;
END $$
-- --------------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE SpMostrarProveedoresDesactivados()
BEGIN
	SELECT
		ID_PROVEEDOR,
		NOMBRE_PROVEEDOR,
		DESCRIPCION,
		TELEFONO,
		CORREO,
		ESTADO
        FROM PROVEEDORES P
    WHERE P.ESTADO = 0;
END $$

-- --------------------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE SpDesactivarUsuario(IN pIdUsuario CHAR(7))
BEGIN
	UPDATE usuarios
    SET ESTADO = 0
    WHERE ID_RESPONSABLE = pIdUsuario;
END $$
-- ---------------------------------------------------------------- --
DELIMITER $$
CREATE PROCEDURE SpReactivarUsuario(IN pIdUsuario CHAR(7))
BEGIN
	UPDATE usuarios
    SET ESTADO = 1
    WHERE ID_RESPONSABLE = pIdUsuario;
END $$
-- --------------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE SpMostrarUsuariosDesactivados()
BEGIN
	SELECT
		ID_RESPONSABLE,
		NOMBRE_USUARIO,
		CONTRASENNA,
		FECHA
        FROM USUARIOS U
    WHERE U.ESTADO = 0;
END $$
-- ----------------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE SpDesactivarSucursal(IN pIdSucursal CHAR(7))
BEGIN
	UPDATE sucursales
    SET ESTADO = 0
    WHERE ID_SUCURSAL = pIdSucursal;
END $$

---------------------------------------------------------------------------

DELIMITER $$
CREATE PROCEDURE SpReactivarSucursal(IN pIdSucursal CHAR(7))
BEGIN
	UPDATE sucursales
    SET ESTADO = 1
    WHERE ID_SUCURSAL = pIdSucursal;
END $$

------------------------------------------------------------------------------

DELIMITER $$
CREATE PROCEDURE SpMostrarSucursalesDesactivadas()
BEGIN
	SELECT
		ID_SUCURSAL,
        NOMBRE,
        DIRECCION,
        TELEFONO,
        ESTADO
        FROM SUCURSALES S
    WHERE S.ESTADO = 0;
END $$

----------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE SpInsertarCategoria(
  IN newCOD_CATEGORIA CHAR(7),
  IN newNOMBRE VARCHAR(120)
)
BEGIN
	INSERT INTO CATEGORIAS(COD_CATEGORIA,NOMBRE_CATEGORIA)
    VALUES (newCOD_CATEGORIA, newNOMBRE);
END $$

-- ---------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE SpCalcularCostoUnidad(IN pIdProducto CHAR(7))
BEGIN
	UPDATE productos pr
    INNER JOIN presentaciones p
    ON pr.COD_PRODUCTO = P.COD_PRODUCTO
    SET COSTO_UNITARIO = COSTO_TOTAL_PRODUCTO / p.UNIDADES
    WHERE pr.COD_PRODUCTO = pIdProducto;
END $$

-- -----------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE SpCalcularTotalProductos(IN pIdProducto CHAR(7))
BEGIN
	UPDATE productos
    SET TOTAL_UNITARIO = CANTIDAD_STOCK + CANTIDAD_USO
    WHERE COD_PRODUCTO = pIdProducto;
END $$

-- ---------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE SpCalcularNuevoStock(IN pIdProducto CHAR(7), IN pNuevoStock INT(10))
BEGIN
	UPDATE productos pr
    INNER JOIN presentaciones p
    ON pr.COD_PRODUCTO = p.COD_PRODUCTO
    SET CANTIDAD_STOCK = CANTIDAD_STOCK + pNuevoStock
    WHERE pr.COD_PRODUCTO = pIdProducto;
    call SpCalcularTotalProductos(pIdProducto);
END $$

-- ------------------------------------------------------------------
-- ------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE SpListarProductosPorVencer()
BEGIN
	SELECT
		NOMBRE_SUB_CATEGORIA,
		P.COD_PRODUCTO,
		NOMBRE_PRODUCTO,
		NOMBRE_PRESENTACION,
		UNIDADES,
		TOTAL_UNITARIO,
		CANTIDAD_STOCK,
		CANTIDAD_USO,
		COSTO_TOTAL_PRODUCTO,
		date_format(FECHA_VENCIMIENTO, "%d/%m/%Y") AS FECHA
		FROM PRODUCTOS P
		INNER JOIN PRESENTACIONES C
		INNER JOIN SUBCATEGORIAS S
        INNER JOIN PRESENTACION PR
		ON P.COD_PRODUCTO = C.COD_PRODUCTO AND S.COD_SUB_CATEGORIA = P.COD_SUB_CATEGORIA
        AND C.ID_PRESENTACION = PR.ID_PRESENTACION
    WHERE date_sub(fecha_vencimiento, interval 30 day) <= curdate();
END $$

----------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE SpListarProductosPorAcabar()
BEGIN
    SELECT
    NOMBRE_SUB_CATEGORIA,
    P.COD_PRODUCTO,
	NOMBRE_PRODUCTO,
    NOMBRE_PRESENTACION,
    UNIDADES,
    TOTAL_UNITARIO,
    CANTIDAD_STOCK,
    CANTIDAD_USO,
    COSTO_TOTAL_PRODUCTO,
    date_format(FECHA_VENCIMIENTO, "%d/%m/%Y") AS FECHA
    FROM PRODUCTOS P
    INNER JOIN PRESENTACIONES C
    INNER JOIN SUBCATEGORIAS S
    INNER JOIN PRESENTACION PR
    ON P.COD_PRODUCTO = C.COD_PRODUCTO AND S.COD_SUB_CATEGORIA = P.COD_SUB_CATEGORIA
	AND C.ID_PRESENTACION = PR.ID_PRESENTACION
 WHERE UNIDADES <= 10;
END $$


delimiter $$
	create procedure SpConsultarUsuarios(in new_nombre_usuario varchar(30), in new_contrasenna varchar(10))
    begin
		select nombre_usuario from usuarios where nombre_usuario = new_nombre_usuario and contrasenna = new_contrasenna;
    end
$$

--------------------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE SpIngresarPresentacion(
  IN newID_Presentacion int(11),
  IN newNOMBRE VARCHAR(30)
)
BEGIN
	INSERT INTO PRESENTACION(ID_PRESENTACION, NOMBRE_PRESENTACION)
    VALUES(newID_Presentacion, newNOMBRE);
END $$
-------------------------------------------------------------------------------


delimiter $$
create procedure SpConsultaUsoFiltrado(in primerMes varchar(2), in primerAnio varchar(4),
	in segundoMes varchar(2), in segundoAnio varchar(4), in producto varchar(7))
begin
	select cod_producto, uso as dato, date_format(fecha, "%m/%Y") AS fecha  from reportes
	where month(fecha) in (primerMes, segundoMes) and year(fecha) in (primerAnio, segundoAnio) and cod_producto = producto;
end $$

delimiter $$
create procedure SpConsultaUsoGeneral(in producto varchar(7))
begin
	select cod_producto, uso as dato, date_format(fecha, "%m/%Y") AS fecha  from reportes
	where cod_producto = producto;
end $$

delimiter $$
create procedure SpConsultaPrecioFiltrado(in primerMes varchar(2), in primerAnio varchar(4),
	in segundoMes varchar(2), in segundoAnio varchar(4), in producto varchar(7))
begin
	select cod_producto, precio as dato, date_format(fecha, "%m/%Y") AS fecha  from reportes
	where month(fecha) in (primerMes, segundoMes) and year(fecha) in (primerAnio, segundoAnio) and cod_producto = producto;
end $$

delimiter $$
create procedure SpConsultaPrecioGeneral(in producto varchar(7))
begin
	select cod_producto, precio as dato, date_format(fecha, "%m/%Y") AS fecha  from reportes
	where cod_producto = producto;
end $$


--------------------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE spActualizarCantidades(
	IN newCOD_PRODUCTO CHAR(7),
    IN newCantidad_Uso INT(4),
    IN newCantidad_Stock INT(4),
    IN newCantidad_Inicial INT(11)
)
	BEGIN
		UPDATE PRODUCTOS P
			SET CANTIDAD_USO = newCantidad_Uso,
				CANTIDAD_STOCK = newCantidad_Stock,
                TOTAL_INICIAL = newCantidad_Inicial
			WHERE
				P.COD_PRODUCTO = newCOD_PRODUCTO;
	END $$
--------------------------------------------------------------------------------
DELIMITER $$
	CREATE PROCEDURE SpDatosReportes()
		BEGIN
			SELECT
				R.COD_PRODUCTO,
                P.NOMBRE_PRODUCTO,
                P.MONEDA,
                PRECIO,
                USO,
                date_format(FECHA_VENCIMIENTO, "%m/%Y") AS FECHA
			FROM REPORTES R
            INNER JOIN PRODUCTOS P
            WHERE R.COD_PRODUCTO = P.COD_PRODUCTO
            ORDER BY FECHA ASC;
		END $$

