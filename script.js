// script.js

document.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('output');
  let currentInput = '';
  let memory = 0;

  function updateOutput(value) {
    output.value = value;
  }

  function handleButtonClick(event) {
    const buttonValue = event.target.innerText;

    if (!isNaN(buttonValue) || buttonValue === '.') {
      // Handle numbers and decimal point
      currentInput += buttonValue;
      updateOutput(currentInput);
    } else {
      // Handle operators and actions
      switch (buttonValue) {
        case 'MC':
          currentInput = '';  // Clear the current math expression
          updateOutput('');
          break;
        case 'M+':
          memory += parseFloat(output.value) || 0;
          break;
        case '/':
        case '*':
        case '-':
        case '+':
          currentInput += ` ${buttonValue} `;
          updateOutput(currentInput);
          break;
        case '=':
          try {
            const result = eval(currentInput);
            updateOutput(result);
            currentInput = result.toString();
          } catch {
            updateOutput('Error');
            currentInput = '';
          }
          break;
        case 'C':
          currentInput = '';
          updateOutput('');
          break;
        default:
          break;
      }
    }
  }

  const buttons = document.querySelectorAll('.button-conatiner button');
  buttons.forEach(button => button.addEventListener('click', handleButtonClick));
});
