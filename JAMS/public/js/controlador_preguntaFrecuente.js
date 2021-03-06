'uset strict';

const Input_pregunta = document.querySelector('#txt_pregunta');
const Input_respuesta = document.querySelector('#txt_respuesta');
const Input_centro = document.querySelector('#centro');


const boton_registrar = document.querySelector('#btn');


/**
 * Función para validar los campos
 */
let validar = () => {
    let error = false;

    if (Input_pregunta.value == '') {
        error = true;
        Input_pregunta.classList.add('error_input');
    } else {
        Input_pregunta.classList.remove('error_input');
    }


    if (Input_respuesta.value == '') {
        error = true;
        Input_respuesta.classList.add('error_input');
    } else {
        Input_respuesta.classList.remove('error_input');
    }


    return error;

};


/**
 * Evento click para el botón registrar
 */
let registrar_preguntaFrecuente = () => {
    if (validar() == true) {//llamada a la función
        swal.fire(
            {
                type: 'warning',
                title: 'Datos  Incompletos',
                text: 'Por favor, revise los campos resaltados en rojo'
            }
        );

    } else {
        let pregunta = Input_pregunta.value;
        let respuesta = Input_respuesta.value;
        let centroEducativo = Input_centro.value;


        post_registrarPreguntaFrecuente(pregunta, respuesta, centroEducativo);


    }
};


boton_registrar.addEventListener('click', registrar_preguntaFrecuente);


