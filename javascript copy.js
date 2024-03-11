
// THIS WAS JUST AN UNRELATED TEST ON RECURSION.
// const factorial = n => {
//     if (n == 1) return 1
//     return n * factorial(n - 1)
// } 
// console.log(factorial(3));

// let inputHolder = "";

// let inputRef = document.querySelectorAll(".input-key");
// let displayRef = document.querySelector("display-container");



// inputRef.forEach(function(button) {
//     button.addEventListener("click", function () {
//         console.log(button.value)
//         displayRef.textContent = button.innerText
// })
// })

// TODO: Get rid of unneeded button attributes, like value, etc...

const currNum = document.querySelector(".current-number");
const prevNum = document.querySelector(".previous-number");

const numBtn = document.querySelectorAll(".number"); // includes "."
const opeBtn = document.querySelectorAll(".operator");

const equBtn = document.querySelector("#equals");
const delBtn = document.querySelector("#delete");
const clrBtn = document.querySelector("#clear");

const plmiBtn = document.querySelector("#plus-minus");
const spqrBtn = document.querySelector("#roman-numeral");
const factBtn = document.querySelector("#factorial");
const percBtn = document.querySelector("#percentage");
const tmolBtn = document.querySelector("#the-meaning-of-life");

class Calculator {
  constructor(prevNum, currNum) {
    this.prevNum = prevNum,
    this.currNum = currNum
    this.clear()
  }

    clear() {
        this.prevNum = "";
        this.currNum = "";
        this.operation = undefined; 
    }

  delete() {
        this.currNum = this.currNum.toString().slice(0, -1);
  }

  displayNumber(number) {
    if (number === "." && this.currNum.includes(".")) 
    return this.currNum = this.currNum.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currNum === "") return
    if (this.prevNum != "") {
        this.compute()
    }
    this.operation = operation;
    this.prevNum = this.currNum;
    this.currNum = "";
  }

  compute() {
    let computation 
    const prev = parseFloat(this.prevNum)
    const curr = parseFloat(this.currNum)
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currNum = computation;
    this.operation = undefined;
    this.prevNum = "";
  }

  updateDisplay() {
    this.currNum.innerText = this.currNum;
    this.prevNum.innerText = this.prevNum;
  }
}

const calculator = new Calculator(prevNum,currNum);

numBtn.forEach(function (button) {
  button.addEventListener("click", function () {
    calculator.displayNumber(button.innerText);
    calculator.updateDisplay();
  });
});

opeBtn.forEach(function (button) {
  button.addEventListener("click", function () {
    calculator.displayNumber(button.innerText);
    calculator.updateDisplay();
  });
});

equBtn.addEventListener("click", function () {
    calculator.compute()
    calculator.updateDisplay()
  });

clrBtn.addEventListener("click", function () {
    calculator.clear();
    calculator.updateDisplay();
  });

delBtn.addEventListener("click", function () {
  calculator.delete();
  calculator.updateDisplay();
});
