'use strict';

/**
 * Exportamos todas las dependencias necesarias para establecer la conexión
 */
const express = require('express'),
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser'),
      morgan =  require('morgan'),
      mongoose = require('mongoose');

/**
 * Se definen las variables necesarias para la conexión con MongoDB
 */
let db = mongoose.connection,
   // dburl = 'mongodb://pabskun:1pabskun9@proyecto-shard-00-00-ev3z1.mongodb.net:27017,proyecto-shard-00-01-ev3z1.mongodb.net:27017,proyecto-shard-00-02-ev3z1.mongodb.net:27017/cocoa?ssl=true&replicaSet=proyecto-shard-0&authSource=admin&retryWrites=true', //usando mongoDb Atlas,
    //dburl = 'mongodb://pabs:1biblioteca9@ds163680.mlab.com:63680/bd_biblioteca' //usando mlab,
    dburl = 'mongodb://jams:proyecto06@clusterjams-shard-00-00-bwmen.mongodb.net:27017,clusterjams-shard-00-01-bwmen.mongodb.net:27017,clusterjams-shard-00-02-bwmen.mongodb.net:27017/MEP?ssl=true&replicaSet=clusterJAMS-shard-0&authSource=admin&retryWrites=true',
    port = 4000;

/**
 * Se le indica que cree un servidor extra dentro del puerto 4000 y escuche los cambios que se le hagan a esos archivos
 */
let server = app.listen(port,_server());

/**
 * Se define la conexión con Mongoose, enviándole como parámetro la url de la base de datos
 */
mongoose.connect(dburl, { useNewUrlParser: true });

/**
 * Si la conexión falla, imprime en consola el error
 */
db.on('error', console.error.bind(console, 'Error de conexión: '));

/**
 * Si la conexión es exitosa nos imprime en la consola que se ha establecido conexión con Mongo
 */
db.once('open', function () {
  console.log('Base de datos conectada correctamente');
});

/**
 * Le indicamos a express que envíe las respuestas a la carpeta "public"
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Le indicamos a la aplicación que el formato de los datos va a ser JSON
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use( function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


//cuando levanto el servidor el index queda levantado.
//el route es el que permite a que las peticiones se reciban y se ruten los comentarios para que sean respondidos
 const cita = require('./componentes/citas/citas.route');
 

 app.use('/api', cita);





// Se guarda todo lo que se ha realizado
module.exports = app;

function _server(){
  console.log('Back-end corriendo en el puerto ' + port);
};