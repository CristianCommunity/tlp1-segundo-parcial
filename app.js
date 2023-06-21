// Imports
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

//El metodo permite leer variables de entorno .env
require('dotenv').config()

// Se importa la instancia de conexión a la base de datos - (debe ser después de leer las variables de entorno)
const { sequelize } = require('./db');

// Se ejecuta una instancia de conexión a la base de datos
sequelize.authenticate()
    .then(() => console.log('Conexión a base de datos exitosa'))
    .catch((error) => console.log('Error al conectar a base de datos', error));

require('ejs');

// Si no existe el archivo .env, el valor por defecto del puerto será 6000
const port = process.env.PORT || 6000;

// Se inicializa express para poder usar sus métodos
const app = express();

// Middlewares
// TODO: Implementar middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Archivos estáticos utilizando la librería path que viene en NodeJS
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de motor de plantillas EJS
app.set('view engine', 'ejs');

// Routes
app.use(require('./routes/reserva.routes'));

// TODO: Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404
app.use((req, res, next) => {
    res.write(`<div>
        <h1>404 - Ruta no encontrada</h1>
        <hr>
        <p>La pagina que intentas buscar no existe</p>
        <p>Redireccionando a la página de inicio...</p>
        <script>
        (
          () => setTimeout(() => {
            window.location.href='http://localhost:${port}/tareas';
           }, 3000)           
        )();
        </script>
    </h1>`)
});

// Starting the server
app.listen(port, console.log(`Servidor corriendo en http://localhost:${port}`));