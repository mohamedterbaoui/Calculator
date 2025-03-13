const calculatorBtns = document.querySelector(".calculator-btns");
const memory = document.querySelector("#memory");
const input = document.querySelector("#input");
const buttons = [
  "C",
  "exp",
  "mod",
  "n!",
  7,
  8,
  9,
  "×",
  4,
  5,
  6,
  "-",
  1,
  2,
  3,
  "+",
  "+/-",
  0,
  ".",
  "=",
];

const numberLimit = 16;

const onBtnClick = function (number) {
  if (input.textContent.length < numberLimit) {
    input.textContent += number;
  }
};

const displayButtons = function (buttons) {
  for (let i = 0; i < buttons.length; i++) {
    const btn = document.createElement("button");
    btn.textContent = buttons[i];
    btn.classList.add("btn");
    btn.id = buttons[i];
    calculatorBtns.append(btn);
    btn.addEventListener("click", () => onBtnClick(btn.textContent));
  }
};

const addEventToBtn = function (btn, func) {
  const element = document.querySelector(`#${btn}`);
  element.addEventListener("click", func);
};

const clearInput = function () {
  input.textContent = "";
  input.textContent = "";
};

displayButtons(buttons);
addEventToBtn("C", clearInput);
