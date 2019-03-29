'use strict';

const tabla = document.querySelector('#tbl_lista_utiles tbody');

function seleccionar_lista (){
    let id_lista = this.dataset.codigo;
    localStorage.setItem('lista', id_lista);
    window.location.href = 'agregar_articulos.html';
};

let mostrar_datos = () =>{
    let lista_utiles = obtener_lista_utiles();
   

    for (let i= 0; i < lista_utiles.length; i++) {
       let fila = tabla.insertRow();
       let boton_agregar = document.createElement('button');
        boton_agregar.type = 'button';
        boton_agregar.textContent = 'Agregar Artículos';
        boton_agregar.dataset.codigo = lista_utiles[i]['_id'];

       boton_agregar.addEventListener('click', seleccionar_lista);

       fila.insertCell().innerHTML = lista_utiles[i]["tipo"];
       fila.insertCell().innerHTML = lista_utiles[i]["nombre"];
       fila.insertCell().innerHTML = lista_utiles[i]["anno"];  
       fila.insertCell().innerHTML = lista_utiles[i]["_id"];  
       fila.insertCell().appendChild(boton_agregar);
    
      
    }
   
};

mostrar_datos();