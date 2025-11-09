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

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;
  if (currentOperator === '/' && display.textContent === '0') {
    display.textContent = "Error: Can't divide by 0!";
    currentOperator = null;
    return;
  }

  secondNumber = display.textContent;
  const result = operate(currentOperator, firstNumber, secondNumber);
  display.textContent = Math.round(result * 1000) / 1000;
  firstNumber = display.textContent;
  currentOperator = null;
}

function appendDecimal() {
  if (shouldResetDisplay) {
    display.textContent = '0';
    shouldResetDisplay = false;
  }
  if (!display.textContent.includes('.')) {
    display.textContent += '.';
  }
}

function backspace() {
  display.textContent = display.textContent.slice(0, -1) || '0';
}

document.querySelectorAll('.buttons button').forEach((button) => {
  if (button.classList.contains('operator')) {
    button.addEventListener('click', () => setOperator(button.textContent));
  } else if (button.classList.contains('equal')) {
    button.addEventListener('click', evaluate);
  } else if (button.classList.contains('clear')) {
    button.addEventListener('click', clearDisplay);
  } else if (button.classList.contains('decimal')) {
    button.addEventListener('click', appendDecimal);
  } else if (button.classList.contains('backspace')) {
    button.addEventListener('click', backspace);
  } else {
    button.addEventListener('click', () => updateDisplay(button.textContent));
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key >= 0 && e.key <= 9) updateDisplay(e.key);
  if (['+', '-', '*', '/'].includes(e.key)) setOperator(e.key);
  if (e.key === 'Enter' || e.key === '=') evaluate();
  if (e.key === 'Backspace') backspace();
  if (e.key === 'Escape') clearDisplay();
  if (e.key === '.') appendDecimal();
});