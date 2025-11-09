function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: Can't divide by 0!";
  }
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      return null;
  }
}

const display = document.getElementById('display');
let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetDisplay = false;

function updateDisplay(value) {
  if (shouldResetDisplay) {
    display.textContent = '';
    shouldResetDisplay = false;
  }
  if (display.textContent === '0' || display.textContent === "Error: Can't divide by 0!") {
    display.textContent = '';
  }
  display.textContent += value;
}

function clearDisplay() {
  display.textContent = '0';
  firstNumber = '';
  secondNumber = '';
  currentOperator = null;
}