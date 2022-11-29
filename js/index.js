import { Anuncio } from "./Anuncio.js";
import { crearTabla } from "./tablaDinamica.js";
// import { anuncios, guardarEnLocalStorage, agregarAnuncio } from "./storage.js";
import Anuncio_Auto from "./Anuncio_Auto.js";
import {
  validarCampoVacio,
  validarRango,
  validarPuertas,
  validarTexto,
} from "./validaciones.js";

const formulario = document.forms[0];
const controles = formulario.elements;

// console.log(controles);

const {
  txtTitulo,
  txtDescripcion,
  txtPrecio,
  txtPuertas,
  txtKMs,
  txtPotencia,
  chTransaccion,
  chLowrider,
  chFlamas,
  chAleron,
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
    control.addEventListener("blur", validarCampoVacio);
    if (control.matches("[type=text]")) {
      control.addEventListener("blur", validarTexto);
    } else if (control.matches("[id=txtKMs]")) {
      control.addEventListener("blur", (e) => validarRango(e, 0, 200000));
    } else if (control.matches("[id=txtPotencia]")) {
      control.addEventListener("blur", (e) => validarRango(e, 50, 300));
    }
  }
}

window.addEventListener("submit", (e) => {
  e.preventDefault();
});

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

    const lowrider = checkSiNo(chLowrider.checked);
    const flamas = checkSiNo(chFlamas.checked);
    const aleron = checkSiNo(chAleron.checked);

    let nuevoAnuncio = new Anuncio_Auto(
      Date.now(),
      titulo,
      transaccion,
      descripcion,
      precio,
      puertas,
      km,
      potencia,
      lowrider,
      flamas,
      aleron
    );
    small.classList.remove("danger", "smallError");
    small.textContent = "";
    simularCarga(nuevoAnuncio, "Guardando");
  } else {
    small.textContent = "Error, intente nuevamente";
    small.classList.add("danger", "smallError");
    cantidadInputVacios = 0;
  }
});


btnModificar.addEventListener("click", () => {
  modificarAnuncio(idSelecionado);
});

btnEliminar.addEventListener("click", () => {
  console.log(idSelecionado);
  eliminarAnuncio(idSelecionado);
});


const divTabla = document.getElementById("divTabla");
divTabla.appendChild(crearTabla(listaAnuncios));
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
    small.textContent = "";
    btnGuardar.classList.add("notVisible");
    btnEliminar.classList.remove("notVisible");
    btnModificar.classList.remove("notVisible");
  }
});


function agregarAnuncio(auxAnuncio) {
  listaAnuncios.push(auxAnuncio);
  actualizarTabla(listaAnuncios);
  localStorage.setItem("anuncios", JSON.stringify(listaAnuncios));
  limpiarInputs();
}

const mensaje = (texto, remove) => {
  const small = document.getElementById("mensaje-form");
  small.textContent = texto;
  small.classList.add("mensaje");
  if(remove){
  small.classList.remove("mensaje");

  }
}


function simularCarga(auxAnuncio, texto) {
  const divSpinner = document.getElementById("spinner-container");

  setSpinner(divSpinner, "./assets/preloader.gif");
  mensaje(texto)
  setTimeout(() => {
    if(texto =="Guardando"){
      agregarAnuncio(auxAnuncio);
    }
    clearSpinner(divSpinner);
    mensaje("", true)
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
    chVenta,
    chLowrider,
    chFlamas,
    chAleron,
  } = controles;

  txtTitulo.value = "";
  txtDescripcion.value = "";
  txtPrecio.value = "";
  txtPuertas.value = "";
  txtKMs.value = "";
  txtPotencia.value = "";
  chVenta.checked = true;
  chLowrider.checked = false;
  chFlamas.checked = false;
  chAleron.checked = false;
  txtTitulo.classList.remove("inputOk");
  txtDescripcion.classList.remove("inputOk");
  txtPrecio.classList.remove("inputOk");
  txtPuertas.classList.remove("inputOk");
  txtKMs.classList.remove("inputOk");
  txtPotencia.classList.remove("inputOk");
}


function completarForm(anuncio) {
  const {
    txtTitulo,
    txtDescripcion,
    txtPrecio,
    txtPuertas,
    txtKMs,
    txtPotencia,
    chLowrider,
    chFlamas,
    chAleron,
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
  anuncio.lowrider == "si"
    ? (chLowrider.checked = true)
    : (chLowrider.checked = false);
  anuncio.flamas == "si"
    ? (chFlamas.checked = true)
    : (chFlamas.checked = false);
  anuncio.aleron == "si"
    ? (chAleron.checked = true)
    : (chAleron.checked = false);

  // console.log(anuncio)
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
  const lowrider = chLowrider.checked ? "si" : "no";
  const flamas = chFlamas.checked ? "si" : "no";
  const aleron = chAleron.checked ? "si" : "no";

  const anuncioAux = new Anuncio_Auto(
    id,
    titulo,
    transaccion,
    descripcion,
    precio,
    puertas,
    km,
    potencia,
    lowrider,
    flamas,
    aleron
  );

  console.log(anuncioAux);
  listaAux.push(anuncioAux);
  localStorage.setItem("anuncios", JSON.stringify(listaAux));
  simularCarga(false, "Modificando anuncio");
  limpiarInputs();
  actualizarTabla(listaAux);
  btnGuardar.classList.remove("notVisible");
  btnEliminar.classList.add("notVisible");
  btnModificar.classList.add("notVisible");
}

function eliminarAnuncio(id) {
  const listaAux = listaAnuncios.filter((element) => element.id !== Number(id));
  console.log(listaAux);
  localStorage.setItem("anuncios", JSON.stringify(listaAux));
  simularCarga(false, "Elimininando Anuncio");
  limpiarInputs();
  actualizarTabla(listaAux);
  btnGuardar.classList.remove("notVisible");
  btnEliminar.classList.add("notVisible");
  btnModificar.classList.add("notVisible");
}



const setSpinner = (div, src) => {
  const img = document.createElement("img");
  img.setAttribute("src", src);
  img.setAttribute("alt", "spinner");
  div.appendChild(img);
};

const clearSpinner = (div) => {

  while (div.hasChildNodes()) {
    div.removeChild(div.firstChild);
  }
};

const checkSiNo = (checbox) => {
  if (checbox) {
    return "si";
  } else {
    return "no";
  }
};


