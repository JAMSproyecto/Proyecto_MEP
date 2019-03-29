'use strict';
const Model_Registro_Padre = require('./registro_padre_model');
const Model_usuario = require('./../usuarios/usuario.model');
const Nodemailer = require('nodemailer');
const Obtener_Pin = require('./../funciones_genericas/obtenerPin');
const Pin_Obtenido = Obtener_Pin.get();
const ObtenerFecha = require('./../funciones_genericas/obtenerFecha');


let transporter = Nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'soporte.mep.costarica@gmail.com',
        pass: '1Proyecto9'
    }
});

module.exports.registrar_Padre = (req, res) => {

    let registro_usuario = new Model_usuario(
        {
            correo: req.body.email,
            pin: Pin_Obtenido,
            tipo: 'PadreFamilia',
            fechaCreado: ObtenerFecha.get()
        }

    );

    let registro_Padre = new Model_Registro_Padre(
        {
            correo: req.body.email,
            nombre: req.body.nombre,
            segundoNombre: req.body.segundoNombre,
            apellido: req.body.apellido,
            segundoApellido: req.body.segundoApellido,
            tipoIdentificacion: req.body.tipoIdentificacion,
            numIdentificacion: req.body.numIdentificacion,
            nacionalidad: req.body.nacionalidad,
            fechaNacimiento: req.body.fechaNacimiento,
            numCel: req.body.numCel,
            numCasa: req.body.numCasa,
            provincia: req.body.provincia,
            canton: req.body.canton,
            distrito: req.body.distrito,
            direccion: req.body.direccion,
            cantidadHijos: req.body.cantidadHijos,
            nombreHijo: req.body.nombreHijo,
            edadHijo: req.body.edadHijo,
            nombreHijo2: req.body.nombreHijo2,
            edadHijo2: req.body.edadHijo2,
            nombreHijo3: req.body.nombreHijo3,
            edadHijo3: req.body.edadHijo3,
            nombreHijo4: req.body.nombreHijo4,
            edadHijo4: req.body.edadHijo4
        }
    );

    registro_usuario.save(
        (error) => {
            if (error) {
                res.json(
                    {
                        success: false,
                        message: `1Ha ocurrido el siguiente error ${error}`
                    }
                )
            } else {
                registro_Padre.save(
                    (error) => {
                        if (error) {
                            res.json(
                                {
                                    success: false,
                                    message: `Ha ocurrido el siguiente error ${error}`
                                }
                            )
                        } else {

                            let mailOptions = {
                                from: 'soporte.mep.costarica@gmail.com',
                                to: registro_Padre.email,
                                subject: 'Verificación de correo electrónico',
                                html: `<h1 style="color:#227093;">Saludos ${ registro_Padre.nombre} </h1>
                                <p>Gracias por registrarse en nuestra aplicación</p>
                                <p>Por favor verifique el siguiente pin de validación</p>
                                <p>${Pin_Obtenido} </p>
                                `
                            };
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });

                            res.json(
                                {
                                    success: true,
                                    message: `Se registró el perfil de manera correcta`
                                }
                            )
                        }
                    }
                );
            }
        }
    );
};

module.exports.listar_Padres = (req, res) => {
    Model_Registro_Padre.find().then(
        function (data) {
            if (data.length > 0) {
                res.json(
                    {
                        success: true,
                        data: data
                    }
                )
            } else {
                res.json(
                    {
                        success: false,
                        data: 'Data not found'
                    }
                )
            }
        }
    );
};

module.exports.buscar_padre = function (req, res) {
    const filtros = { correo: req.body.correo };

    Model_Registro_Padre.findOne(filtros).then(
        function (usuarioPadre) {
            if (usuarioPadre) {
                res.json(
                    {
                        success: true,
                        message: usuarioPadre
                    }
                );
            } else {
                res.json(
                    {
                        success: false,
                        message: 'No se encontró el padre de familia'
                    }
                );
            }

        }
    )
};
/*
module.exports.buscar_informacion_padre = function(req, res){
    Model_Registro_Padre.findOne({correo : req.body.correo}).then(
        function(usuarioInfoPadre){
            if(usuarioInfoPadre){
                res.json(
                {
                    success: true,
                    correo : usuarioInfoPadre
                }
                );
            }else{
                res.send('No se encontró el padre de familia');
            }

        }
    )
};
*/