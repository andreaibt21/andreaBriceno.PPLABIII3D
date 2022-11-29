//Lista de anuncios
const listaAnuncios = JSON.parse(localStorage.getItem("anuncios"));

const contenedor = document.getElementById("anuncios-container");

function crearTarjeta(
  tituloA,
  descripcionA,
  precioA,
  puertasA,
  kmA,
  potenciaA,
  lowriderA,
  flamaA,
  aleronA
) {
  const newCard = document.createElement("div");

  const titulo = document.createElement("h3");
  titulo.textContent = "Titulo: " + tituloA;

  const descripcion = document.createElement("p");
  descripcion.textContent = "Descripción: " + descripcionA;

  const precio = document.createElement("p");
  precio.textContent = "Precio: $" + precioA;

  const puertas = document.createElement("p");
  puertas.textContent = "Puertas: " + puertasA;

  const imgPuertas = document.createElement("img");
  imgPuertas.setAttribute("src", "./assets/puertas.png");
  imgPuertas.setAttribute("height", "25px");

  const km = document.createElement("p");
  km.textContent = "km: " + kmA;

  const imgkm = document.createElement("img");
  imgkm.setAttribute("src", "./assets/km.png");
  imgkm.setAttribute("height", "25px");

  const potencia = document.createElement("p");
  potencia.textContent = "Potencia: " + potenciaA;

  const imgPotencia = document.createElement("img");
  imgPotencia.setAttribute("src", "./assets/potencia.png");
  imgPotencia.setAttribute("height", "25px");

  const detalles = document.createElement("div");
  const item1 = document.createElement("div");
  const item2 = document.createElement("div");
  const item3 = document.createElement("div");
  item1.setAttribute("class", "item");
  item2.setAttribute("class", "item");
  item3.setAttribute("class", "item");
  detalles.setAttribute("class", "detalles");

  const tunear = document.createElement("div");
  const itemT1 = document.createElement("div");
  const itemT2 = document.createElement("div");
  const itemT3 = document.createElement("div");
  itemT1.setAttribute("class", "item");
  itemT2.setAttribute("class", "item");
  itemT3.setAttribute("class", "item");
  tunear.setAttribute("class", "detalles");

  const lowrider = document.createElement("p");
  lowrider.textContent = "Lowrider: " + lowriderA;
  itemT1.appendChild(lowrider);
  
  const flama = document.createElement("p");
  flama.textContent = "Flamas: " + flamaA;
  itemT2.appendChild(flama);

  const aleron = document.createElement("p");
  aleron.textContent = "Aleron: " + aleronA;
  itemT3.appendChild(aleron);

  const button = document.createElement("button");
  button.textContent = "Ver detalles";

  newCard.appendChild(titulo);
  newCard.appendChild(descripcion);
  newCard.appendChild(precio);
  item1.appendChild(imgPuertas);
  item1.appendChild(puertas);
  item2.appendChild(imgkm);
  item2.appendChild(km);
  item3.appendChild(imgPotencia);
  item3.appendChild(potencia);
  detalles.appendChild(item1);
  detalles.appendChild(item3);
  detalles.appendChild(item2);
  newCard.appendChild(detalles);
  tunear.appendChild(itemT1);
  tunear.appendChild(itemT3);
  tunear.appendChild(itemT2);


  newCard.appendChild(tunear);
  newCard.appendChild(button);
  newCard.classList.add("card");

  return newCard;
}

listaAnuncios.forEach((elemento) => {
  const $nuevaTarjeta = crearTarjeta(
    elemento.titulo,
    elemento.descripcion,
    elemento.precio,
    elemento.puertas,
    elemento.kilometraje,
    elemento.potencia,
    elemento.lowrider,
    elemento.flamas,
    elemento.aleron
  );

  contenedor.appendChild($nuevaTarjeta);
});
