const numBtn = document.querySelectorAll(".number"); // Note: includes "."
const opeBtn = document.querySelectorAll(".operator");

const equBtn = document.querySelector("#equals");
const delBtn = document.querySelector("#delete");
const clrBtn = document.querySelector("#clear");

const spqrBtn = document.querySelector("#roman-numeral");
const factBtn = document.querySelector("#factorial");
const percBtn = document.querySelector("#percentage");
const tmolBtn = document.querySelector("#the-meaning-of-life");
const plmiBtn = document.querySelector("#plus-minus");

const displayCurrNum = document.querySelector("#current-number");
const displayPrevNum = document.querySelector("#previous-number");

let currentNum = "";
let previousNum = "";
let operation = null;
let specKeyCase;
let topMsgOrError = "";

const capitalRomanNumeral = /[A-Z]/;
const romanNumeralTopLimit = 4000;
const factorialBotLimit = 1;
const factorialTopLimit = 170;

// Responsive Style Changes to Error Handling
const fontSize = "10px";
const errFontSize = "20px";
const textAlign = "left"
const justifyContent = "start";
const backgroundColor = "var(--my-black)";

// Messages
const errMsgPrevNumText = "ERROR";
const errMsgDivZed =
  "Infinity?!? Uh oh, you just broke space-time. Quick, hit the CLR button!";
const errMsgNatNum = "Please input natural numbers only. Click CLR Button.";
const errMsgPerNum = "Percentages only work with numbers. Click CLR Button.";
const errMsgRomNum =
  "Please use only natural numbers; Roman numeral maximum is 3999.";
const errMsgTooBig =
  "Result too large to represent accurately. Click CLR Button.";
const msgRomNumClr = "Please hit CLR to continue.";

numBtn.forEach(function (button) {
  button.addEventListener("click", function () {
    appendNum(button.innerText);
    updateDisplay();
  });
});

opeBtn.forEach(function (button) {
  button.addEventListener("click", function () {
    appendOper(button.innerText);
    updateDisplay();
  });
});

clrBtn.addEventListener("click", clear);
delBtn.addEventListener("click", deleteNum);
equBtn.addEventListener("click", computeIt);


spqrBtn.addEventListener("click", computeRomanNumeral);
percBtn.addEventListener("click", computePercentage);
factBtn.addEventListener("click", computeFactorial);
tmolBtn.addEventListener("click", computeTheMeaningOfLife);
plmiBtn.addEventListener("click", changePositiveOrNegative);

function updateDisplay() {
  displayCurrNum.innerText = currentNum;
  displayPrevNum.innerText = previousNum + " " + (operation || "");
  if (currentNum === Infinity || currentNum === -Infinity) {
    errorStyleDivZed();
    displayPrevNum.innerText = errMsgDivZed;
  }
}

function appendNum(numButton) {
  if (numButton === "." && currentNum.includes(".")) {
    return; // Stops multiple decimals
  } 
  // else if (isNaN(currentNum)) { // This line stops anything not a number, or a string that represents a number. Code below handles this problem of non-numbers now, but keep in case I reuse this code at a future date.
  //   return;
  // }  
  else if (
    currentNum === Infinity ||
    currentNum === -Infinity ||
    previousNum === "ERROR" ||
    currentNum.match(capitalRomanNumeral)
  ) {
    return;
  } else {
    currentNum = currentNum.toString() + numButton.toString(); // This allows for numbers with digits more than one. I always forget to do this at first.
  } 
}

function appendOper(operButton) {
  if (
    currentNum === "" ||
    isNaN(currentNum) ||
    previousNum === "ERROR"
    ) {
    return;
  } else if (previousNum !== "") {
    computeIt();
  }
  operation = operButton;
  previousNum = currentNum;
  currentNum = "";
}

function defaultStyles() {
  previousNum = "";
  topMsgOrError = "";
  displayCurrNum.style.fontSize = "14px";
  displayCurrNum.style.justifyContent = "end";
  displayCurrNum.style.color = "var(--my-dkgray)";
  displayCurrNum.style.backgroundColor = "var(--my-white)";
  displayPrevNum.style.fontSize = "12px";
  displayPrevNum.style.justifyContent = "end";
  displayPrevNum.style.color = "var(--my-gray)";
  displayPrevNum.style.backgroundColor = "var(--my-white)"; 
}

function errMsgPrevNumFunc() {
  topMsgOrError = errMsgPrevNumText;
}

function errorStyle() {
  displayCurrNum.style.backgroundColor = backgroundColor;
  displayCurrNum.style.fontSize = fontSize;
  displayCurrNum.style.textAlign = textAlign;
  displayPrevNum.style.backgroundColor = backgroundColor;
  displayPrevNum.style.fontSize = errFontSize;
  displayPrevNum.style.justifyContent = justifyContent;
}

function errorStyleDivZed() {
  displayCurrNum.style.backgroundColor = backgroundColor;
  displayPrevNum.style.backgroundColor = backgroundColor;
  displayPrevNum.style.fontSize = fontSize;
  displayPrevNum.style.justifyContent = "start";
  displayCurrNum.style.color = "gold";
  displayPrevNum.style.color = "gold";
}

function errorLo() {
  displayCurrNum.style.color = "yellowgreen";
  displayPrevNum.style.color = "yellowgreen";
}

function errorMd() {
  displayCurrNum.style.color = "tomato";
  displayPrevNum.style.color = "tomato";
}

function romanNumeralStyle() {
  displayCurrNum.style.backgroundColor = backgroundColor;
  displayPrevNum.style.backgroundColor = backgroundColor;
  displayPrevNum.style.justifyContent = justifyContent;
  displayCurrNum.style.color = "deepskyblue";
  displayPrevNum.style.color = "deepskyblue";
}

function clear() {
  currentNum = "";
  previousNum = "";
  operation = null;
  defaultStyles();
  updateDisplay();
 }

function deleteNum() {
  if (
    currentNum === Infinity ||
    currentNum === -Infinity ||
    previousNum === "ERROR" 
  ) {
    return;
  } else {
    currentNum = currentNum.toString().slice(0, -1);
    updateDisplay();
  }
}

function computeIt() {
  let computation;
  const prev = parseFloat(previousNum);
  const current = parseFloat(currentNum);
  if (isNaN(prev) || isNaN(current)) {
    return;
  } else {
      switch (operation) {
        case "+":
          computation = prev + current;
          break;
        case "-":
          computation = prev - current;
          break;
        case "*":
          computation = prev * current;
          break;
        case "/":
          computation = prev / current;
          break;
        default:
          return;
    }
  currentNum = computation;
  operation = undefined;
  previousNum = "";
  updateDisplay();
  }
}

function romanNumeralizer(n) {
  function placeValue(n, results = [], factor = 1) {
    if (n) {
      const val = (n % 10) * factor;
      results.unshift(val);
      return placeValue(Math.floor(n / 10), results, factor * 10);
    }
    return results;
  }
  const holder = placeValue(n);

  const keyValueRoman = {
    // 9000: "IX", // Unable to get the vinculum lines working to use 4000 to 9000.
    // 8000: "VIII",
    // 7000: "VII",
    // 6000: "VI",
    // 5000: "V",
    // 4000: `<span class="overline">I</span><span class="overline">V</span>"`, // This did not work...
    // 4000: "IV",
    // 4000: "I̅V̅", // This text shows the vinculum over "IV", but it did not render properly in the browser. 
    3000: "MMM",
    2000: "MM",
    1000: "M",
    900: "CM",
    800: "DCCC",
    700: "DCC",
    600: "DC",
    500: "D",
    400: "CD",
    300: "CCC",
    200: "CC",
    100: "C",
    90: "XC",
    80: "LXXX",
    70: "LXX",
    60: "LX",
    50: "L",
    40: "XL",
    30: "XXX",
    20: "XX",
    10: "X",
    9: "IX",
    8: "VIII",
    7: "VII",
    6: "VI",
    5: "V",
    4: "IV",
    3: "III",
    2: "II",
    1: "I",
    0: "",
  };
    const answer = holder.map(function (value) {
    return keyValueRoman[value];
  });
  return answer.join("");
}

function computeRomanNumeral() {

  const current = String(currentNum);
  if (isNaN(current)) {
    return;
  } else if (current > 0 && current < romanNumeralTopLimit && !current.includes(".")) {
    romanNumeralStyle();
    specKeyCase = `${currentNum} = ${romanNumeralizer(current)}`;
    topMsgOrError = msgRomNumClr;
  } else {
    errorStyle();
    errorLo();
    specKeyCase = errMsgRomNum;
    errMsgPrevNumFunc();
  }
  currentNum = specKeyCase;
  previousNum = topMsgOrError;
  updateDisplay();
}

function factorial(n) {
    if (n === 1) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
}; 

function computeFactorial() {
  defaultStyles();
  const current = currentNum;
  if (typeof current === "number") {
    if (
      Number.isInteger(current) &&
      current >= factorialBotLimit &&
      current < factorialTopLimit + 1
    ) {
      specKeyCase = factorial(current);
    } else if (Number.isInteger(current) && current > factorialTopLimit + 1) {
      errorStyle();
      errorMd();
      specKeyCase = errMsgTooBig;
      errMsgPrevNumFunc();
    } else {
      errorStyle();
      errorLo();
      specKeyCase = errMsgNatNum;
      errMsgPrevNumFunc();
    }
  } else if (typeof current === "string") {
      if (current.includes(".") || current < factorialBotLimit) {
        errorStyle();
        errorLo();
        specKeyCase = errMsgNatNum;
        errMsgPrevNumFunc();
      } else if (current > factorialTopLimit) {
        errorStyle();
        errorMd();
        specKeyCase = errMsgTooBig;
        errMsgPrevNumFunc();
      } else if (current.match(capitalRomanNumeral)) {
        errorStyle();
        errorLo();
        specKeyCase = errMsgNatNum;
        errMsgPrevNumFunc();
      } else {
        specKeyCase = factorial(current);
      }
  }
    currentNum = specKeyCase;
    previousNum = topMsgOrError;
    updateDisplay();
}

function computePercentage() {
  defaultStyles();
  const current = parseFloat(currentNum);
  if (isNaN(current)) {
      errorStyle();
      errorLo();
      specKeyCase = errMsgPerNum;
      errMsgPrevNumFunc();
  } 
  else {
    specKeyCase = current / 100;
    } 
  currentNum = specKeyCase;
  previousNum = topMsgOrError;
  updateDisplay()
}

function computeTheMeaningOfLife() {
  defaultStyles();
  currentNum = 42;
  previousNum = "The meaning of life is... ";
  updateDisplay();
}

function changePositiveOrNegative() {
  const current = parseFloat(currentNum);
  if (isNaN(current)) {
    return;
  } else if (plmiBtn) {
    specKeyCase = current * -1;
  }
  currentNum = specKeyCase;
  updateDisplay();
}