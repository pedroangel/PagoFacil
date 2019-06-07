const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const uuidv1 = require('uuid/v1');


app.use(bodyparser.json());

/* Credenciales DB */

//Hostname
const db_host = "localhost";
//Usuario
const db_user = "root";
//Contraseña
const db_password = "PagoFacil2019";
//Base de Datos
const db_database = "PagoFacil_Referidos";

var mysqlConnection = mysql.createConnection({
	host: db_host,
	user: db_user,
	password: db_password,
	database: db_database
});

mysqlConnection.connect((err)=>{
	if(!err)
		console.log('Conexión Exitosa.');
	else
		console.log('Conexión Fallida. \n Error: ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000);


//Insertar Usuario
app.post('/usuario/registrar', (req, res) =>{
	let emp = req.body;
	var UUID_ID = uuidv1();
	var query = `INSERT INTO usuario (id, Nombre, Apellido, DocumentoIdentidad, TipoDocumento, Email, Password, DOB, Sexo, NombreBanco, NumeroCuenta, TipoCuenta, EmailContactoBanco) 
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;


	if(emp.Nombre && emp.Nombre !=='' && emp.Apellido && emp.Apellido !=='' && emp.DocumentoIdentidad && emp.DocumentoIdentidad !=='' && emp.TipoDocumento && emp.TipoDocumento !=='' && emp.Email && emp.Email !=='' && emp.Password && emp.Password !=='' && emp.DOB && emp.DOB !==''){

		mysqlConnection.query(query, [UUID_ID, emp.Nombre, emp.Apellido, emp.DocumentoIdentidad, emp.TipoDocumento, emp.Email, emp.Password, emp.DOB, emp.Sexo, emp.NombreBanco, emp.NumeroCuenta, emp.TipoCuenta, emp.EmailContactoBanco], (err, rows, fields)=>{
			if(!err){
				res.send(JSON.stringify({
					"Status": "OK",
					"Id": UUID_ID
				}));
			}else{
				res.send(JSON.stringify({
					"Status": "NOOK",
					"Error": err
				}));
			}
		});
	}else{
		res.send(JSON.stringify({
			"Status": "NOOK",
			"Error": "Los campos: Nombre, Apellido, DocumentoIdentidad, TipoDocumento, Email, Password y DOB (Fecha de Nacimiento) son Obligatorios!"
		}));
	}
});

//Seteo de Comisión y Activacion
app.put('/usuario/activar/:id', (req, res) =>{
	let emp = req.body;
	var query = "UPDATE usuario SET comision = ?, Status = 'ACTIVO' WHERE id = ?";


	mysqlConnection.query(query, [emp.Comision, req.params.id], (err, rows, fields)=>{
		if(!err){
			if(rows.affectedRows > 0){
				res.send(JSON.stringify({
					"IdUsuario": req.params.id,
					"Status": "OK",
					"Comisión": emp.Comision
				}));
			}else{
				res.send(JSON.stringify({
					"Status": "NOOK",
					"Error": "No se ha podido modificar el Usuario con la ID: " +  req.params.id
				}));
			}
		}else{
			res.send(JSON.stringify({
				"Status": "NOOK",
				"Error": err
			}));
		}
	});
});

//Insertar Transaccion
app.post('/transaccion/registrar', (req, res) =>{
	let emp = req.body;
	var query = `INSERT INTO Transacciones (IdTrx, Monto, TipoMoneda, Detalle, Comercio, IdReferidor, FechaTransaccion)
	VALUES (?, ?, ?, ?, ?, ?, STR_TO_DATE(?, '%d/%m/%Y'))`;

	mysqlConnection.query(query, [emp.IdTrx, emp.Monto, emp.TipoMoneda, emp.Detalle, emp.Comercio, emp.IdReferidor, emp.FechaTransaccion], (err, rows, fields)=>{
		if(!err){
			res.send(JSON.stringify({
				"IdTrx": emp.IdTrx,
				"Status": "OK"
			}));
		}else{
			res.send(JSON.stringify({
				"Status": "NOOK",
				"Error": err
			}));
		}
	});
});
 
//Pagar Transacción
app.put('/transaccion/pagar/:id', (req, res) =>{
	let emp = req.body;
	var query = "UPDATE transacciones SET Pagada = ? WHERE IdTrx = ?";


	mysqlConnection.query(query, [emp.Pagada, req.params.id], (err, rows, fields)=>{
		if(!err){
			if(rows.affectedRows > 0){
				mysqlConnection.query("SELECT IdTrx, Monto FROM transacciones WHERE IdTrx = ?", [req.params.id], (err, rows, fields)=>{
					if(!err){
						res.send(JSON.stringify({
							"IdTrx": rows[0].IdTrx,
							"Status": "OK",
							"Monto": rows[0].Monto
						}));
					}else{
						res.send(JSON.stringify({
							"Status": "NOOK",
							"Error": err
						}));
					}
				});
			}else{
				res.send(JSON.stringify({
					"Status": "NOOK",
					"Error": "No se ha podido modificar la Transacción con la ID: " +  req.params.id
				}));
			}
		}else{
			res.send(JSON.stringify({
				"Status": "NOOK",
				"Error": err
			}));
		}
	});
});

//Calcular Saldo Mensual
app.get('/usuario/saldo/:id', (req, res) =>{

	var query = `SELECT DATE_FORMAT(a.FechaTransaccion,'%m%Y') AS FECHA, SUM(a.Monto * b.Comision) AS ACUMULADA, 
					SUM(CASE WHEN a.Pagada = 'Y' THEN (a.Monto * b.Comision) ELSE 0 END) AS PAGADA,  
					SUM(CASE WHEN a.Pagada = 'N' THEN (a.Monto * b.Comision) ELSE 0 END) AS PENDIENTE  
				FROM transacciones a  
				INNER JOIN usuario b  
					ON a.idReferidor = b.id  
				WHERE a.idReferidor = ?  
				GROUP BY year(a.FechaTransaccion), month(a.FechaTransaccion)`;

	mysqlConnection.query(query, [req.params.id], (err, rows, fields)=>{
		if(!err){

			
			var json_saldo = {};

			rows.forEach(function (row) {
		        json_saldo[row.FECHA] = { 
		        	"ComisionAcumulada" : row.ACUMULADA,
		        	"ComisionPagada" : row.PAGADA,
		        	"SaldoAPagar" : row.PENDIENTE
		      	};
		    });

			res.send(JSON.stringify({
				"IdUsuario" : req.params.id,
				"Saldo" : json_saldo
			}));

		}else{
			res.send(JSON.stringify({
				"Status": "NOOK",
				"Error": err
			}));
		}
	});
});

