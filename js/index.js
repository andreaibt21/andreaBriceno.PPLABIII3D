import { Anuncio } from "./Anuncio.js";
import { crearTabla } from "./tablaDinamica.js";
// import { anuncios, guardarEnLocalStorage, agregarAnuncio } from "./storage.js";
import Anuncio_Auto from "./Anuncio_Auto.js";
import { validarCampoVacio, validarNumero } from "./validaciones.js";

const formulario = document.forms[0];
const controles = formulario.elements;
const {
  txtTitulo,
  txtDescripcion,
  txtPrecio,
  txtPuertas,
  txtKMs,
  txtPotencia,
  chTransaccion,
} = formulario;

const small = document.getElementById("mensaje-form");
const btnGuardar = document.getElementById("btnGuardar");
const btnEliminar = document.getElementById("btnEliminar");
const btnModificar = document.getElementById("btnModificar");
let cantidadInputVacios = 0;
let idSelecionado;


const listaAnuncios = localStorage.getItem("anuncios")
  ? JSON.parse(localStorage.getItem("anuncios"))
  : [];
window.addEventListener("load", () => {
  localStorage.getItem("anuncios")
    ? JSON.parse(localStorage.getItem("anuncios"))
    : localStorage.setItem("anuncios", JSON.stringify([]));
  actualizarTabla(listaAnuncios);
});

//VALIDACIONES
for (let i = 0; i < controles.length; i++) {
  const control = controles.item(i);

  if (control.matches("input")) {
    if (control.matches("[type=text]")) {
      control.addEventListener("blur", validarCampoVacio);
      if (control.classList.contains("number")) {
        control.addEventListener("blur", validarNumero);
      }
    } else if (control.matches("[type=file]")) {
      control.addEventListener("change", validarExtencion);
    }
  }
}

window.addEventListener("submit", (e) => {
  e.preventDefault();});

// CREAR ANUNCIO
btnGuardar.addEventListener("click", (e) => {
  e.preventDefault();

  for (let i = 0; i < controles.length; i++) {
    const control = controles.item(i);
    if (control.matches("[type=text]")) {
      if (!control.classList.contains("inputOk")) {
        cantidadInputVacios++;
      }
    }
  }
  console.log(cantidadInputVacios);
  if (cantidadInputVacios == 0) {
    const titulo = txtTitulo.value;
    const descripcion = txtDescripcion.value;
    const precio = txtPrecio.value;
    const puertas = txtPuertas.value;
    const km = txtKMs.value;
    const potencia = txtPotencia.value;
    const transaccion = chTransaccion.value;
    let nuevoAnuncio = new Anuncio_Auto(
      Date.now(),
      titulo,
      transaccion,
      descripcion,
      precio,
      puertas,
      km,
      potencia
    );
    simularCarga(nuevoAnuncio);
    small.classList.remove("danger", "smallError");
    small.textContent = "";
  } else {
    small.textContent = "Error, intente nuevamente";
    small.classList.add("danger", "smallError");
    cantidadInputVacios = 0;
  }
});

const divTabla = document.getElementById("divTabla");

divTabla.appendChild(crearTabla(listaAnuncios));

function agregarAnuncio(auxAnuncio) {
  listaAnuncios.push(auxAnuncio);
  actualizarTabla(listaAnuncios);
  localStorage.setItem("anuncios", JSON.stringify(listaAnuncios));
  limpiarInputs();
}

function simularCarga(auxAnuncio) {
  const spinner = document.getElementById("spinner");
  spinner.classList.add("visible");
  spinner.classList.remove("notVisible");

  setTimeout(() => {
    console.log("listo");
    spinner.classList.remove("visible");
    spinner.classList.add("notVisible");

    agregarAnuncio(auxAnuncio);
  }, 3000);
}

function actualizarTabla(lista) {
  const divTabla = document.getElementById("divTabla");
  if (divTabla.children.length > 0 && lista.length > 0) {
    const table = crearTabla(lista);
    divTabla.removeChild(divTabla.children[0]);
    divTabla.appendChild(table);
  } else if (lista.length > 0) {
    const table = crearTabla(lista);
    divTabla.appendChild(table);
  }
}

function limpiarInputs() {
  const {
    txtTitulo,
    txtDescripcion,
    txtPrecio,
    txtPuertas,
    txtKMs,
    txtPotencia,
  } = controles;

  txtTitulo.value = "";
  txtDescripcion.value = "";
  txtPrecio.value = "";
  txtPuertas.value = "";
  txtKMs.value = "";
  txtPotencia.value = "";
  txtTitulo.classList.remove("inputOk");
  txtDescripcion.classList.remove("inputOk");
  txtPrecio.classList.remove("inputOk");
  txtPuertas.classList.remove("inputOk");
  txtKMs.classList.remove("inputOk");
  txtPotencia.classList.remove("inputOk");
}

const tabla = document.getElementById("divTabla");
tabla.addEventListener("click", (e) => {
  const emisor = e.target;
  if (emisor.matches("tbody tr td")) {
   idSelecionado = emisor.parentElement.id;
    const anuncio = listaAnuncios.find(
      (element) => element.id == idSelecionado
    );
  
    completarForm(anuncio);

    const btnGuardar = document.getElementById("btnGuardar");
    const btnEliminar = document.getElementById("btnEliminar");
    const btnModificar = document.getElementById("btnModificar");

    btnGuardar.setAttribute("disabled", "");
    btnEliminar.removeAttribute("disabled");
    btnModificar.removeAttribute("disabled");
  }
});

function completarForm(anuncio) {
  const {
    txtTitulo,
    txtDescripcion,
    txtPrecio,
    txtPuertas,
    txtKMs,
    txtPotencia,
    chTransaccion,
  } = controles;
  if (anuncio.transaccion === "venta") {
    chVenta.checked = true;
  } else {
    chAlquiler.checked = true;
  }
  txtTitulo.value = anuncio.titulo;
  txtDescripcion.value = anuncio.descripcion;
  txtPrecio.value = anuncio.precio;
  txtPuertas.value = anuncio.puertas;
  txtKMs.value = anuncio.kilometraje;
  txtPotencia.value = anuncio.potencia;
  txtTitulo.classList.add("inputOk");
  txtDescripcion.classList.add("inputOk");
  txtPrecio.classList.add("inputOk");
  txtPuertas.classList.add("inputOk");
  txtKMs.classList.add("inputOk");
  txtPotencia.classList.add("inputOk");
}

function modificarAnuncio(id) {
  const listaAux = listaAnuncios.filter((element) => element.id !== Number(id));

  const titulo = txtTitulo.value;
  const descripcion = txtDescripcion.value;
  const precio = txtPrecio.value;
  const puertas = txtPuertas.value;
  const km = txtKMs.value;
  const potencia = txtPotencia.value;
  const transaccion = chTransaccion.value;

  const anuncioAux = new Anuncio_Auto( id, titulo, transaccion, descripcion, precio, puertas, km, potencia);

  console.log(anuncioAux);
  listaAux.push(anuncioAux);
  localStorage.setItem("anuncios", JSON.stringify(listaAux));
  limpiarInputs();
  actualizarTabla(listaAux);
  btnGuardar.removeAttribute("disabled");
  btnEliminar.setAttribute("disabled", "");
  btnModificar.setAttribute("disabled", "");
}


function eliminarAnuncio(id) {
  const listaAux = listaAnuncios.filter((element) => element.id !== Number(id));
  console.log( listaAux);
  localStorage.setItem("anuncios", JSON.stringify(listaAux));
  actualizarTabla(listaAux);
  limpiarInputs();
  btnGuardar.removeAttribute("disabled");
  btnEliminar.setAttribute("disabled", "");
  btnModificar.setAttribute("disabled", "");
}




btnModificar.addEventListener("click", () => {
    modificarAnuncio(idSelecionado);
});

btnEliminar.addEventListener("click", () => {
  console.log(idSelecionado);
  eliminarAnuncio(idSelecionado);
});


