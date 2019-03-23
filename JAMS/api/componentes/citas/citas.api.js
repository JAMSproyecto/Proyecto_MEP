'uset strict';
const cita_modelo = require('./citas.model');
const nodemailer = require('nodemailer');



/*funcion para mandar correo al padre*/
let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'anhernan19@hotmail.com',
      pass: 'arbolesdejusticia28',
      html: ''
    }
});
/* fin de funcion para mandar al padre*/

/*funcion para registrar nueva cita*/
module.exports.registrar = (req, res) => {


    /*
    let fecha = new Date(req.body.Fecha + ' 00:00:00 GMT-06:00');

   2019-03-10 00:00:00 GMT-06:00

    2019-03-10  

    2019-03-10 00:00:00 GMT-00:00


    let dia = fecha.getDate();
    let mes = fecha.getMonth()+1;
    let annio = fecha.getFullYear();


   console.log(dia,mes,annio);
    if(mes < 10){
        mes = '0' + mes;
    }

    if (dia < 10){
        dia = '0' + dia;
    }
    /**
 * Retorna la fecha en el formato 'YYYY-MM-DD hh:mm:ss'
 * @return {String}
 */

 /*
let obtenerFecha = () => {
    const fecha = new Date();
    const dia_semana = fecha.getDay();
    const anio = fecha.getFullYear();
    let dia_mes = fecha.getDate();
    let mes = fecha.getMonth();
	let h = fecha.getHours();
    let m = fecha.getMinutes();
    let s = fecha.getSeconds();
    mes += 1;
    if (mes < 10) {
        mes = '0' + mes;
    }
    if (dia_mes < 10) {
        dia_mes = '0' + dia_mes;
    }
	if (h < 10) {
        h = '0' + h;
    }
    if (m < 10) {
        m = '0' + m;
    }
    if (s < 10) {
        s = '0' + s;
    }
    return anio + '-' + mes + '-' + dia_mes + ' ' + h + ':' + m + ':' + s;
};

    
    console.log(req.body);
aqui estoy validando la fecha, la convierto de string a numeros
junto con la hora



let calendario =  dia +'-'+ mes + '-' + annio;*/
    let nueva_cita = new cita_modelo(
        {
            Nombre: req.body.Nombre,
            Apellidos: req.body.Apellidos,
            Telefono: req.body.Telefono,
            Correo: req.body.Correo,
            Fecha:req.body.Fecha,
            Hora: req.body.Hora,
            Motivo: req.body.Motivo,
            Comentario: req.body.Comentario,
            Codigo: req.body.Codigo

        }
    );
    


    nueva_cita.save(
        function (error) {
            if (error) {
               res.json(
                    {
                        success: false,
                        msg: `No se logro guardar los datos ${error}`
                    
                    }
                );
                
            } else {
        /*envio el correo de confirmacion al padre*/
                let mailOptions = {
                    from: 'anhernan19@hotmail.com',
                    to: nueva_cita.Correo,
                    subject: 'Registro de Cita recibido',
                    html: '<h1> Saludos ${nueva_cita.Nombre} </h1>',
                 
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });

                res.json(
                    {
                        success: true,
                        msg: `Registo exitoso`
                    }
                );
            }
        }
    );
}
/*fin de funcion de registro de nueva cita*/

/*funcion de listar citas*/
module.exports.listar_todos = (req ,res) =>{
    cita_modelo.find().then(
        function(citas){
            console.log(citas);
            if(citas.length > 0){
                res.json(
                    {
                        success: true,
                        citas: citas
                    }
                )
            }else{
                res.json(
                    {
                        success: false,
                        comentarios: 'No se encontraron citas'
                    }
                )
            }
        }

    )
};
/*fin de funcion listar citas*/
