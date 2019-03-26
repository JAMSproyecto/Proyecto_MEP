'use strict';
const Mongoose = require('mongoose');

let schema_registro_padres = new Mongoose.Schema(
    {
        nombre : {type : String, required : true},
        segundoNombre: {type : String, required : false},
        apellido: {type : String, required : true},
        segundoApellido: {type : String, required : false},
        tipoIdentificacion: {type : String, required : true},
        numIdentificacion: {type : String, required : true, unique: true},
        nacionalidad: {type : String, required : true},
        fechaNacimiento: {type : String, required : true},
        numCel: {type : String, required : true},
        numCasa: {type : String, required : false},
        correo: {type : String, required : true, unique: true,  trim: true},
        provincia: {type : String, required : true},
        canton: {type : String, required : true},
        distrito: {type : String, required : true},
        direccion: {type : String, required : true},
        cantidadHijos: {type : Number, required : false},
        nombreHijo: {type: String, required: false},
        edadHijo: {type: Number, required: false},
        nombreHijo2: {type: String, required: false},
        edadHijo2: {type: Number, required: false},
        nombreHijo3: {type: String, required: false},
        edadHijo3: {type: Number, required: false},
        nombreHijo4: {type: String, required: false},
        edadHijo4: {type: Number, required: false}
    }
);

module.exports = Mongoose.model('padres_familia_', schema_registro_padres);