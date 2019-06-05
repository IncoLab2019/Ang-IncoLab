delimiter $$
create trigger TrProductos_AU after update on productos
	for each row begin
		declare flag int default 0;
        select 1 from DUAL where
			exists(select fecha from reportes where month(fecha) = month(curdate()) and year(fecha) = year(curdate()) and cod_producto = new.cod_producto)
		into flag;
        
        if flag = 1 then 
		update reportes set fecha = curdate(), uso = new.total_inicial - (new.cantidad_stock + new.cantidad_uso), precio = new.costo_total_producto, precio_unitario =new.costo_unitario
            where reportes.cod_producto = new.cod_producto and month(fecha) = month(curdate()) and year(fecha) = year(curdate());
		else
			insert into reportes values(new.cod_producto,new.costo_unitario, new.costo_total_producto, new.total_inicial - (new.cantidad_stock + new.cantidad_uso),curdate());
		end if;
end$$



delimiter $$
create trigger TrProductos_AI after insert on productos
	for each row begin
		insert into reportes values(new.cod_producto,new.costo_unitario, new.costo_total_producto, new.cantidad_stock, curdate());
end$$


