'use strict';

const tabla = document.querySelector('#tbl_articulos tbody');
const input_filtrar = document.querySelector('#txt_filtrar');
const boton_agregar = document.querySelector('#btn_agregar');

let articulos = obtener_articulos();

let mostrar_datos = () =>{    
    let filtro = input_filtrar.value;
    tabla.innerHTML = '';
    for (let i = 0; i < articulos.length; i++) {
    
      if ((articulos[i]['nombre'].toLowerCase().includes(filtro.toLowerCase())) ||
         articulos[i]['descripcion'].toLowerCase().includes(filtro.toLowerCase())) {

        let fila = tabla.insertRow();
        fila.insertCell().innerHTML = articulos[i]['nombre'];
        fila.insertCell().innerHTML = articulos[i]['descripcion'];
        let input_cantidad = document.createElement('input');
        let input_seleccionar = document.createElement('input');

        input_cantidad.type = 'number';
        input_cantidad.min = '0';
        input_seleccionar.type = 'checkbox';
        input_seleccionar.value = articulos[i]['_id'];
        fila.insertCell().appendChild(input_cantidad);
        fila.insertCell().appendChild(input_seleccionar);
      }  
    }
};
input_filtrar.addEventListener('keyup', mostrar_datos);
mostrar_datos();


let seleccionar_articulos =() =>{
  let id_lista = localStorage.getItem('lista');
  let articulos_seleccionados = document.querySelectorAll('input[type=checkbox]:checked');
  console.log(articulos_seleccionados);

  for (let i = 0; i < articulos_seleccionados.length; i++) {
    agregar_articulo(id_lista,articulos_seleccionados[i].value);
    
  }
};

btn_agregar.addEventListener('click', seleccionar_articulos);