export const validarCampoVacio = (e) => {
  const input = e.target;
  const value = input.value.trim();

  if (!value) {
    setError(input);
  } else {
    clearError(input);
  }
};

const setError = (input, mensaje) => {
  const small = input.nextElementSibling;
  small.textContent = mensaje || `campo requerido`;
  input.classList.remove("inputOk");
  input.classList.add("inputError");

  small.classList.add("danger");
};

const clearError = (input, mensaje) => {
  const small = input.nextElementSibling;

  small.textContent = "";
  input.classList.add("inputOk");
  input.classList.remove("inputError");
};


export const validarNumero = (e) => {
  const pattern = /[^a-z ]\ *([.0-9])*\d/g;
  const input = e.target;
//AGREGAR LIMITES
  if (input.value) {
    if (!isNaN(input.value.trim())) {
      clearError(input);
    } else {
      setError(input, "Ingrese solo numeros");
    }
  }else {
    setError(input);

  }
};


const validarLongitudMinima = (input, minimo) => {
  return input.value.trim().length >= minimo;
};

export const validarExtencion = (e) => {
  const extenciones = ["gif", "jpg", "png", "jpeg"];
  const input = e.target;
  const nombre = input.files[0].name;

  const extension = nombre.split(".").pop();

  if (extenciones.includes(extension)) {
    clearError(input);
  } else {
    setError(input, "archivo invalido");
  }

};
