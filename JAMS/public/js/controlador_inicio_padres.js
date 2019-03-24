'use strict';

const Input_Usuario = document.querySelector('#input_usuario');
const Input_Contrasenna = document.querySelector('#input_contrasenna');
const Boton_Ingresar = document.querySelector('#boton_ingresar');

let mostrarAlerta = (mensaje) => {
    Swal.fire({
        toast: false,
        title: mensaje,
        type: 'warning',
        position: 'center',
        timer: 10000,
        //animation: false,
        //  customClass: 'animated tada',
        showConfirmButton: true
    });
};


let obtener_Datos = () => {
    let usuario = Input_Usuario.value;
    let contrasenna = Input_Contrasenna.value;

    let errorBlancos = validar(usuario, contrasenna);

    if (!errorBlancos) {
       let usuarioAceptado = validar_credenciales(usuario, codificar(contrasenna));
        if (usuarioAceptado) {
            if (usuarioAceptado.succsess === true) {
                window.location.href = 'principal_padres.html';
            } else {
                mostrarAlerta(usuarioAceptado.message);
            }

        } else {
            mostrarAlerta('Usuario o contraseña invalida');
        }
    } else {
        mostrarAlerta('Por favor ingrese el usuario y la contraseña');
    }
};

let validar = (pusuario, pcontrasenna) => {
    let error = false;

    if (pusuario == '') {
        error = true;
        input_usuario.classList.add('error_input');
    } else {
        input_usuario.classList.remove('error_input');
    }

    if (pcontrasenna == '') {
        error = true;
        input_contrasenna.classList.add('error_input');
    } else {
        input_contrasenna.classList.remove('error_input');
    }

    return error;
};

Boton_Ingresar.addEventListener('click', obtener_Datos);