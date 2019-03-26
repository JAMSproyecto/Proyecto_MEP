'use strict';


let registrar_cita = (pnombre, papellidos, ptelefono, pcorreo, pfecha, phora, pmotivo, pcomentario, pcodigo) => {
    let request = $.ajax(
        {
            url: "http://localhost:4000/api/registrar_cita",
            type: "POST",
            data: {
                Nombre: pnombre,
                Apellidos: papellidos,
                Telefono: ptelefono,
                Correo: pcorreo,
                Fecha: pfecha,
                Hora: phora,
                Motivo: pmotivo,
                Comentario: pcomentario,
                Codigo: pcodigo
            },
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        }

    );POST

    request.done(function (msg) {
        if (msg.success) {
            swal.fire(
                {
                    type: 'success',
                    title: 'Los datos fueron guardados exitosamente',
                    text: 'Nos comunicaremos con usted tan pronto como sea posible'
                }
            );
        } else {
            swal.fire(
                {
                    type: 'error',
                    title: 'Los datos no fueron guardados exitosamente',
                    text: 'Error'
                }
            );
        }
    }
    );
 
    request.fail(function (jqXHR, textStatus) {
        swal.fire(
            {
                type: 'error',
                title: 'Los datos no se lograron guardar',
                text: 'Error de conexión'
            }
        );
    }
    );
};

POST

let listar_citas = () => {
    let lista_citas = [];
   
     let request = $.ajax(
         
        {
       url: "http://localhost:4000/api/listar_citas",
       type: "GET",
       data: {
       },
       dataType: "json",
       contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
       async : false
     }
     );
   
     request.done(function (res) {
       lista_citas = res.citas;
      
       
     });
   
     request.fail(function (jqXHR, textStatus) {
       
     });
   return lista_citas
    
   };