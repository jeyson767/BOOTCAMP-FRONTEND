let numeroActual = '0'
let operador = ''
let operando = ''

// Consultar un elemento a la vez
const inputDisplay = document.querySelector('#inputDisplay')
// console.log({inputDisplay})
// Consultar multiples elementos a la vez
const buttons = document.querySelectorAll('.button')
console.log(buttons)

// EVENTOS

buttons.forEach(function(button) {
  button.addEventListener('click', function(event) {
    // console.log('Hice click!', event.target)

    const buttonText = event.target.textContent

    if ('*-+'.includes(buttonText)) {
      // 02. Accionamos el operador
      operador = buttonText
      operando = Number(numeroActual)
      numeroActual = '0'
    } else if (buttonText === '=') {
      // TODO: Calcular las operaciones en base al número actual y el operando
      // 03. Aquí realizamos las operaciones en base al número actual y el operando
      if (operador === '+') {
        numeroActual = Number(operando) + Number(numeroActual)
      }
      if (operador === '-') {
        numeroActual = Number(operando) - Number(numeroActual)
      }
      if (operador === '*') {
        numeroActual = Number(operando) * Number(numeroActual)
      }
    } else if (buttonText === 'C') {
      // TODO: Limpiar el operando, operador y el input
      // 04. Limpiamos operando, operador y el input
      numeroActual = '0'
      operador = ''
      operando = ''
    } else {
      // 01. Se presionó algún número
      numeroActual = Number(numeroActual + buttonText)
    }

    inputDisplay.value = numeroActual
  })
})
