# Prueba Técnica - Backend - Pago Fácil
Ing. Pedro A. Alarcon Atencio <br>
pedroangel126@gmail.com
# Instalación
Descargar los archivos: 
- <a href="https://github.com/pedroangel/PagoFacil/blob/master/index.js" target="_blank">index.js</a>
- <a href="https://github.com/pedroangel/PagoFacil/blob/master/package.json" target="_blank">package.json</a>
- <a href="https://github.com/pedroangel/PagoFacil/blob/master/package-lock.json" target="_blank">package-lock.json</a>

Con los archivos dentro de la carpeta que hayan creado para el proyecto, entrar al símbolo del sistema y ejecutar el siguiente comando para instalar todas las dependencias listadas en el archivo <a href="https://github.com/pedroangel/PagoFacil/blob/master/package.json" target="_blank">package.json</a>:
```sh
$ npm install
```
Detalle de dependencias (estas ya deben estar instaladas después de ejecutar el comando anterior, este listado esta para referencia)
## body-parser v1.18.3.
```sh
$ npm install body-parser
```
## express v4.16.4.
```sh
$ npm install express
```
## mysql v2.16.0.
```sh
$ npm install mysql
```
## uuid v3.3.2.
```sh
$ npm install uuid
```
# Base de Datos MySQL
Utilice el servicio ofrecido en el Control Panel de XAMPP v3.2.2 para levantar un servidor MySQL en mi localhost con las credenciales:

- Hostname "localhost".
- Usuario "root"
- Contraseña "PagoFacil2019".
- Base de Datos "PagoFacil_Referidos".

De ser necesario utilizar otras credenciales diferentes, debe hacerse el ajuste pertinente en el archivo <a href="https://github.com/pedroangel/PagoFacil/blob/master/index.js" target="_blank">index.js</a>.

<img src="https://raw.githubusercontent.com/pedroangel/PagoFacil/master/Referencias/screenshots_db_datos.png" />

## Importar tablas y datos de prueba
Deben crear una Base de Datos nueva ("PagoFacil_Referidos"), descargar el archivo <a href="https://github.com/pedroangel/PagoFacil/blob/master/pagofacil_referidos.sql" target="_blank">pagofacil_referidos.sql</a> e importarlo a la nueva BD. Este paso creara las tablas utilizadas por el sistema, así como insertar algunos campos de prueba que utilice durante el desarrollo.

# Peticiones y Respuestas (Ejecución de la API)
Para gestionar las peticiones y respuestas del servidor, utilice la aplicación <a href="https://www.getpostman.com/downloads/" target="_blank">Postman para Windows</a> 

<img src="https://raw.githubusercontent.com/pedroangel/PagoFacil/master/Referencias/postman_01.png" />

<img src="https://raw.githubusercontent.com/pedroangel/PagoFacil/master/Referencias/postman_02.png" />

<img src="https://raw.githubusercontent.com/pedroangel/PagoFacil/master/Referencias/postman_03.png" />


Esta es la información básica del proceso y las herramientas usadas en el desarrollo del servicio requerido para la Prueba Técnica.

Agradezco la oportunidad y el reto que represento este requerimiento, ya que es mi primera aplicación desarrollada utilizando NodeJS.

De ser necesario, por favor indicarme algún otro tipo de información que deba ser aclarada de mi parte. 

