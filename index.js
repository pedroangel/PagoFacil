const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'PagoFacil_Referidos'
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
	var query = "INSERT INTO `usuario` (`id`, `Nombre`, `Apellido`, `DocumentoIdentidad`, `TipoDocumento`, `Email`, `Password`, `DOB`, `Sexo`, `NombreBanco`, `NumeroCuenta`, `TipoCuenta`, `EmailContactoBanco`) \
	VALUES (uuid() , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	mysqlConnection.query(query, [emp.Nombre, emp.Apellido, emp.DocumentoIdentidad, emp.TipoDocumento, emp.Email, emp.Password, emp.DOB, emp.Sexo, emp.NombreBanco, emp.NumeroCuenta, emp.TipoCuenta, emp.EmailContactoBanco], (err, rows, fields)=>{
		if(!err){
			res.send("Registro Exitoso!");
		}else{
			console.log(err);
		}
	});
});
 

 
