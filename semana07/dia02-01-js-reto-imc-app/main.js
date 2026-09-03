/**
 * Calculadora de Índice de Masa Corporal (IMC)
 * Bootcamp Frontend Python G31 JV • Victor Villazón
 */

const formulario = document.getElementById("imcForm");
const pesoInput = document.getElementById("peso");
const alturaInput = document.getElementById("altura");

const resultadoContainer = document.getElementById("resultadoContainer");
const imcMensaje = document.getElementById("imcMensaje");
const imcValor = document.getElementById("imcValor");
const imcDetalle = document.getElementById("imcDetalle");

formulario.addEventListener("submit", function (event) {
  // Evita que el formulario recargue la página
  event.preventDefault();

  const peso = parseFloat(pesoInput.value);
  const alturaCm = parseFloat(alturaInput.value);

  // Validación de datos
  if (isNaN(peso) || peso <= 0 || isNaN(alturaCm) || alturaCm <= 0) {
    alert("Por favor ingresa valores válidos para peso y altura.");
    return;
  }

  // Convertir altura de cm a metros
  const alturaMetros = alturaCm / 100;

  // Fórmula: IMC = peso / (altura * altura)
  const imc = peso / (alturaMetros * alturaMetros);
  const imcRedondeado = imc.toFixed(2);

  // Determinar estado y categoría según la OMS
  let estado = "";
  let claseColor = "";
  let detalle = "";

  if (imc < 18.5) {
    estado = "BAJO PESO";
    claseColor = "bajo";
    detalle = "Estás por debajo del peso recomendado (< 18.5)";
  } else if (imc >= 18.5 && imc <= 24.9) {
    estado = "NORMAL";
    claseColor = "normal";
    detalle = "¡Felicitaciones! Tienes un peso saludable (18.5 - 24.9)";
  } else if (imc >= 25 && imc <= 29.9) {
    estado = "SOBREPESO";
    claseColor = "sobrepeso";
    detalle = "Estás en el rango de sobrepeso (25.0 - 29.9)";
  } else {
    estado = "OBESO";
    claseColor = "obeso";
    detalle = "Tu IMC indica obesidad (≥ 30.0)";
  }

  // Actualizar contenido
  imcMensaje.textContent = `Tu Índice de Masa Corporal es ${estado}`;
  imcValor.textContent = imcRedondeado;
  imcDetalle.textContent = detalle;

  // Resetear clases de color y aplicar la correspondiente
  resultadoContainer.className = `result-box ${claseColor}`;
});
