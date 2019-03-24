'use strict';

const input_tipo = document.querySelector('#txt_tipo');
const input_nombre = document.querySelector('#txt_nombre');
const input_anno = document.querySelector('#txt_anno');


const boton_crear = document.querySelector('#btn_agregar');

let validar = () => {
    let error = false;

    if (input_tipo.value == '') {
        error = true;
        input_tipo.classList.add('error_input');
    } else {
        input_tipo.classList.remove('error_input');
    }

    if (input_nombre.value == '') {
        error = true;
        input_nombre.classList.add('error_input');
    } else {
        input_nombre.classList.remove('error_input');
    }

    if (input_anno.value == '') {
        error = true;
        input_anno.classList.add('error_input');
    } else {
        input_anno.classList.remove('error_input');
    }

  
    return error;
};

let obtener_datos = () =>{
    if (validar() == false) {
        let tipo = input_tipo.value;
        let nombre = input_nombre.value;
        let anno = input_anno.value;
        

        registrar_lista_utiles(tipo, nombre, anno);
    } else {
        swal.fire({
            type: 'warning',
            title: 'La lista de útiles no fue enviada',
            text: 'Por favor revise los campos resaltados'
        });
    }
};

boton_crear.addEventListener('click', obtener_datos );