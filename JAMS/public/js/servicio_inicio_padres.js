'use strict';

function validar_credenciales(pusuario, pcontrasenna) {
  let respuesta = '';
  let peticion = $.ajax({
    url: 'http://localhost:4000/api/validar_credenciales',
    type: 'post',
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    dataType: 'json',
    async: false,
    data: {
      correo: pusuario,
      contrasena: pcontrasenna
    }
  });

  peticion.done(function (response) {
    respuesta = response;
    sessionStorage.setItem('conectado', response.success);
    sessionStorage.setItem('tipoUsuario', response.tipo);
    sessionStorage.setItem('correo', response.message.correo);
    sessionStorage.setItem('id', response.id);
  });

  peticion.fail(function (response) {
    respuesta = response;
  });

  return respuesta;
};