const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "+/-", 0, "."];
const operations = [
  { id: "plus", text: "+", "+": (a, b) => Number(a) + Number(b) },
  { id: "minus", text: "-", "-": (a, b) => a - b },
  { id: "times", text: "x", x: (a, b) => a * b },
  { id: "divide", text: "/", "/": (a, b) => a / b },
  { id: "exponential", text: "^", "^": (a, b) => a ** b },
  { id: "modulo", text: "%", "%": (a, b) => a % b },
];

const options = [
  { id: "clear", text: "C" },
  { id: "equal", text: "=" },
];

const input = document.querySelector("#input");
const memory = document.querySelector("#memory");

const btnNumbers = document.querySelector(".numbers");
const btnOperations = document.querySelector(".operations");

const maxNumbers = 16;

const evaluate = function (firstOperand, secondOperand, operation) {
  if (memory.textContent && input.textContent) {
    const op = operations.find((op) => op.text === operation);
    const result = op[operation](firstOperand, secondOperand);
    return result;
  }
};

const drawButtons = function () {
  numbers.forEach((element) => {
    const btn = document.createElement("div");
    btn.classList.add("nbr-btn");
    btn.textContent = element;
    btnNumbers.append(btn);

    if (element !== "+/-" && element !== ".") {
      btn.addEventListener("click", () => {
        if (input.textContent.length <= maxNumbers) {
          input.textContent += btn.textContent;
        }
      });
    }

    if (element === ".") {
      btn.addEventListener("click", () => {
        if (!input.textContent.includes(".") && input.textContent) {
          input.textContent += ".";
        }
      });
    } else if (element === "+/-") {
      btn.addEventListener("click", () => {
        if (input.textContent) {
          if (input.textContent.includes("-")) {
            input.textContent = input.textContent.slice(1);
          } else {
            input.textContent = "-" + input.textContent;
          }
        }
      });
    }
  });

  operations.forEach((element) => {
    const btn = document.createElement("div");
    btn.classList.add("op-btn");
    btn.textContent = element.text;
    btn.id = element.id;
    btnOperations.append(btn);

    btn.addEventListener("click", () => {
      if (!memory.textContent) {
        if (input.textContent) {
          input.textContent += " " + btn.textContent;
          memory.textContent = input.textContent;
          input.textContent = "";
        }
      } else {
        if (input.textContent) {
          const firstPart = memory.textContent.split(" ");
          const firstOperand = firstPart[0];
          const operation = firstPart[1];
          const secondOperand = input.textContent;

          const result = evaluate(firstOperand, secondOperand, operation);

          memory.textContent = result + " " + btn.textContent;
          input.textContent = "";
        } else {
          const temp = memory.textContent.split(" ");

          memory.textContent = temp[0] + " " + btn.textContent;
        }
      }
    });
  });

  const equal = document.createElement("div");
  const backspace = document.createElement("div");
  const clear = document.createElement("div");

  equal.textContent = "=";
  clear.textContent = "C";
  backspace.textContent = "<=";

  equal.classList.add("op-btn");
  clear.classList.add("op-btn");
  backspace.classList.add("op-btn");

  equal.id = "equal";
  clear.id = "clear";
  backspace.id = "backspace";

  btnOperations.append(clear);
  btnOperations.append(equal);
  btnOperations.append(backspace);

  equal.addEventListener("click", () => {
    if (memory.textContent && input.textContent) {
      const firstPart = memory.textContent.split(" ");
      const firstOperand = firstPart[0];
      const operation = firstPart[1];
      const secondOperand = input.textContent;
      const result = evaluate(firstOperand, secondOperand, operation);

      input.textContent = result;
      memory.textContent = "";
    }
  });

  clear.addEventListener("click", () => {
    memory.textContent = "";
    input.textContent = "";
  });

  backspace.addEventListener("click", () => {
    if (input.textContent) {
      input.textContent = input.textContent.slice(0, -1);
    }
  });
};

drawButtons();
