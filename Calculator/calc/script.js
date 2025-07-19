const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
let current = '';
let lastInput = '';
const operators = ['+', '-', '*', '/'];

function updateDisplay() {
  display.value = current;
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => handleInput(btn.textContent, btn.id));
});

document.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || operators.includes(e.key) || e.key === '.') {
    handleInput(e.key);
  } else if (e.key === 'Enter' || e.key === '=') {
    handleInput('=', 'equals');
  } else if (e.key === 'Backspace') {
    current = current.slice(0, -1);
    updateDisplay();
  } else if (e.key.toLowerCase() === 'c') {
    handleInput('C', 'clear');
  }
});

function handleInput(value, id = '') {
  if (id === 'clear') {
    current = '';
    updateDisplay();
    return;
  }
  if (id === 'equals' || value === '=') {
    try {
      if (current === '' || operators.includes(current.slice(-1))) return;
      current = eval(current).toString();
      updateDisplay();
    } catch {
      display.value = 'Error';
      current = '';
    }
    return;
  }
  if (operators.includes(value)) {
    if (current === '' || operators.includes(current.slice(-1))) return;
    current += value;
    updateDisplay();
    return;
  }
  if (value === '.') {
    const parts = current.split(/[\+\-\*\/]/);
    if (parts[parts.length - 1].includes('.')) return;
    if (current === '' || operators.includes(current.slice(-1))) current += '0';
    current += '.';
    updateDisplay();
    return;
  }
  if (value === '0') {
    const parts = current.split(/[\+\-\*\/]/);
    if (parts[parts.length - 1] === '0') return;
  }
  current += value;
  updateDisplay();
}