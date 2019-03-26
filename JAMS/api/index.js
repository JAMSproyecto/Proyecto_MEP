'use strict';

/**
 * Exportamos todas las dependencias necesarias para establecer la conexión
 */
const express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    tiza = require('chalk');

/**
 * Módulo para dar colores al texto de la consola
 * https://www.npmjs.com/package/chalk
 */
const ColorBackEnd = tiza.rgb(248, 260, 190).bgBlack,
    ColorNormal = tiza.rgb(236, 236, 236).bgBlack,
    ColorConectado = tiza.bold.rgb(73, 163, 111).bgBlack,
    ColorError = tiza.bold.yellow.bgBlack,
    ColorDesconectado = tiza.bold.red.bgBlack,
    ColorTerminacion = tiza.bold.magenta.bgBlack;

/**
 * Se definen las variables necesarias para la conexión con MongoDB
 */
const Port = 4000 || 4001,
Dburl = 'mongodb://jams:'+encodeURIComponent('proyecto06')+'@clusterjams-shard-00-00-bwmen.mongodb.net:27017,clusterjams-shard-00-01-bwmen.mongodb.net:27017,clusterjams-shard-00-02-bwmen.mongodb.net:27017/MEP?ssl=true&replicaSet=clusterJAMS-shard-0&authSource=admin&retryWrites=true';


/**
 * Usar Promise con bluebird
 */
mongoose.Promise = require('bluebird');

let db = mongoose.connection;

/**
 * Se le indica que cree un servidor extra dentro del puerto 4000 y escuche los cambios que se le hagan a esos archivos
 */
let _server = () => {
    console.log(ColorBackEnd(' Back-end corriendo en el puerto ' + Port));
    console.log(' ');
};
let server = app.listen(Port, _server());

/**
 * Se define la conexión con Mongoose, enviándole como parámetro la url de la base de datos
 */
mongoose.connect(Dburl, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true});

/**
 * Si la conexión es exitosa nos imprime en la consola que se ha establecido conexión con Mongo
 */
db.once('open', () => {
    console.log(ColorConectado(' Base de datos conectada correctamente'));
    console.log(' ');
});

/**
 * Si la conexión falla, imprime en consola el error
 */
db.on('error', (err) => {
    process.stdout.write('\x07');
    console.log(ColorError(' Error de conexión: ' + err));
    console.log(' ');
});

db.on('disconnected', () => {
    console.log(ColorDesconectado(' Base de datos desconectada'));
    console.log(' ');
});

/**
 * Le indicamos a express que envíe las respuestas a la carpeta "public"
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Le indicamos a la aplicación que el formato de los datos va a ser JSON
 */
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(morgan('dev'));

/**
 * Permitir a cualquier origen el acceso a los recursos
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

/**
 * Obtener los componentes y asignarlos a la app
 */


const articulos = require('./componentes/articulos/articulos.route');
const lista_utiles = require('./componentes/lista_utiles/lista_utiles.route');
const bitacora_transaccional = require('./componentes/bitacora_transaccional/bitacora.route');
const citas = require('./componentes/citas/citas.route');
const ce_niveles = require('./componentes/centro_educativo_niveles/CEduNiveles.route');
const instalacion = require('./componentes/instalacion/instalacion.route');
const registrar_ce = require('./componentes/registrar_centro_educativo/registrarCEdu.route');
const CompCredenciales = require('./componentes/credenciales/credenciales.route');
const registrar_pf = require('./componentes/registro_padre/registro_padre_route');
const usuario = require('./componentes/usuarios/usuario.route');
const pregunta_frec = require('./componentes/preguntas_frecuentes/preguntas_frecuentes.route');
const actividades = require('./componentes/actividad/registrar_actividad.route');


//app.use('/api', actividades);

app.use('/api', articulos);
app.use('/api', bitacora_transaccional);
app.use('/api', ce_niveles);
app.use('/api', citas);
app.use('/api', lista_utiles);
app.use('/api', registrar_ce);
app.use('/api', CompCredenciales);
app.use('/api', registrar_pf);
app.use('/api', usuario);
app.use('/api', pregunta_frec);
app.use('/api', instalacion);
app.use('/api', actividades);

// Se guarda todo lo que se ha realizado
module.exports = app;

/**
 * Este evento se activa cuando el proceso se cierra.
 * Cuando el proceso se cierra, es un buen hábito cerrar toda la conexión abierta de la base de datos.
 */
process.on('SIGINT', () => {
    db.close(() => {
        console.log(ColorTerminacion(' La base de datos se desconecta debido a la terminación de la aplicación'));
        process.exit(0);
    });
});
