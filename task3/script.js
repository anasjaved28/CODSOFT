var input = "";

function appendToDisplay(value) {
  var operators = ["+", "-", "*", "/"];
  var lastChar = input[input.length - 1];

  // prevent two operators in a row
  if (operators.indexOf(value) !== -1 && operators.indexOf(lastChar) !== -1) {
    input = input.slice(0, -1);
  }

  // prevent starting with an operator (except minus)
  if (input === "" && operators.indexOf(value) !== -1 && value !== "-") {
    return;
  }

  // prevent two decimals in the same number
  if (value === ".") {
    var parts = input.split(/[\+\-\*\/]/);
    var lastPart = parts[parts.length - 1];
    if (lastPart.indexOf(".") !== -1) {
      return;
    }
  }

  input += value;
  document.getElementById("result").innerText = input;
  document.getElementById("expression").innerText = "";
}

function calculate() {
  if (input === "") {
    return;
  }

  var expression = input;

  // replace display symbols with real operators
  var result;
  if (input === "") {
    return;
  }

  // check for division by zero
  var parts = input.split("/");
  var i = 0;
  while (i < parts.length - 1) {
    var nextPart = parts[i + 1].trim();
    if (nextPart === "0" || nextPart === "") {
      document.getElementById("expression").innerText = expression + " =";
      document.getElementById("result").innerText = "Error";
      input = "";
      return;
    }
    i++;
  }

  // evaluate
  if (input.indexOf("//") !== -1 || input.indexOf("**") !== -1) {
    document.getElementById("result").innerText = "Error";
    input = "";
    return;
  }

  result = eval(input);

  // round floating point issues
  result = parseFloat(result.toFixed(10));

  document.getElementById("expression").innerText = expression + " =";
  document.getElementById("result").innerText = result;
  input = String(result);
}

function clearAll() {
  input = "";
  document.getElementById("result").innerText = "0";
  document.getElementById("expression").innerText = "";
}

function deleteLast() {
  if (input.length === 0) {
    return;
  }
  input = input.slice(0, -1);
  if (input === "") {
    document.getElementById("result").innerText = "0";
  } else {
    document.getElementById("result").innerText = input;
  }
}

// keyboard support
document.addEventListener("keydown", function (event) {
  var key = event.key;
  var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var ops = ["+", "-", "*", "/"];

  if (numbers.indexOf(key) !== -1) {
    appendToDisplay(key);
  } else if (ops.indexOf(key) !== -1) {
    appendToDisplay(key);
  } else if (key === ".") {
    appendToDisplay(".");
  } else if (key === "Enter" || key === "=") {
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearAll();
  }
});
