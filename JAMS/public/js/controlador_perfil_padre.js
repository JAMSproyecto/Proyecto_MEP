'use strict';

const nombre_padre = document.querySelector('#nombre_completo_padre');
const correo_electronico_padre = document.querySelector('#correo_padre');
const telefono_padre = document.querySelector('#telefono_padre');
const identificacion_padre = document.querySelector('#identificacion_padre');
const provincia_padre = document.querySelector('#provincia_padre');
const canton_padre = document.querySelector('#canton_padre');
const distrito_padre = document.querySelector('#distrito_padre');

let usuario = ver_padres();
let padresFamilia = listar_padres();

let llenar_perfil_padre = () => {

    for (let i = 0; i < padresFamilia.length; i++) {

        nombre_padre.innerHTML = padresFamilia[i]['nombre'];
        correo_electronico_padre.innerHTML = padresFamilia[i]['email'];
        telefono_padre.innerHTML = padresFamilia[i]['numCel'];
        identificacion_padre.innerHTML = padresFamilia[i]['numIdentificacion'];
        provincia_padre.innerHTML = padresFamilia[i]['provincia'];
        canton_padre.innerHTML = padresFamilia[i]['canton'];
        distrito_padre.innerHTML = padresFamilia[i]['distrito'];
        }


};



llenar_perfil_padre();
