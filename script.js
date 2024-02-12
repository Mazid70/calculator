document.addEventListener("DOMContentLoaded", function () {
  const output = document.getElementById("output");
  const buttons = document.querySelectorAll("button");

  let currentOperand = "";
  let previousOperand = "";
  let operation = "";

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const buttonText = button.textContent;

      if (buttonText === "=") {
        compute();
        updateDisplay();
        return;
      }

      if (buttonText.match(/[0-9.]/)) {
        currentOperand += buttonText;
        updateDisplay();
        return;
      }

      if (buttonText.match(/[\+\-\*\/]/)) {
        if (currentOperand === "") return;
        if (previousOperand !== "") {
          compute();
        }
        operation = buttonText;
        previousOperand = currentOperand;
        currentOperand = "";
        return;
      }

      if (buttonText === "MC") {
        currentOperand = "";
        previousOperand = "";
        operation = "";
        updateDisplay();
        return;
      }

      if (buttonText === "M+") {
        const memory = parseFloat(output.value) || 0;
        const currentValue = parseFloat(currentOperand) || 0;
        currentOperand = (memory + currentValue).toString();
        updateDisplay();
        return;
      }
    });
  });

  function compute() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "/":
        result = prev / current;
        break;
      default:
        return;
    }
    currentOperand = result.toString();
    previousOperand = "";
    operation = "";
  }

  function updateDisplay() {
    output.value = currentOperand;
  }
});
