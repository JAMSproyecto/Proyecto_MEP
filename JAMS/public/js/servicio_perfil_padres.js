
'use strict';

let ver_padres = () => {
    let ver_todos_padres = [];
  
    let request = $.ajax({
      url: "http://localhost:4000/api//obtener_todos_usuarios",
      method: "GET",
      data: {
      },
      dataType: "json",
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      async: false
    });
  
    request.done(function (res) {
        ver_todos_padres = res.obtenerResultado;
  
    });
  
    request.fail(function (jqXHR, textStatus) {
  
    });
    return ver_todos_padres;
  
  };