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

let currentNum = "";
let previousNum = "";
let operation = null;

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
  else {
    currentNum = currentNum.toString() + numButton.toString(); // This allows for numbers with digits more than one. I always forget to do this at first.
  } 
}

function appendOper(operButton) {
  if (currentNum === "" || isNaN(currentNum)) {
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
  displayCurrNum.style.fontSize = "14px";
  displayCurrNum.style.justifyContent = "end";
  displayCurrNum.style.color = "var(--my-dkgray)";
  displayCurrNum.style.backgroundColor = "var(--my-white)";
  displayPrevNum.style.fontSize = "12px";
  displayPrevNum.style.justifyContent = "end";
  displayPrevNum.style.color = "var(--my-gray)";
  displayPrevNum.style.backgroundColor = "var(--my-white)"; 
}

// Error Handling
const fontSize = "10px";
const errFontSize = "20px";
const textAlign = "left"
const justifyContent = "start";
const backgroundColor = "var(--my-black)";
const topText = "ERROR"

const errMsgTooBig = "Result too large to represent accurately. Click CLR Button.";
const errMsgRomNum = "Please use only natural numbers; Roman numeral maximum is 3999.";
const errMsgNatNum = "Please input natural numbers only. Click CLR Button.";
const errMsgPerNum = "Percentages only work with numbers. Click CLR Button.";
const errMsgDivZed = "Infinity?!? Uh oh, you just broke space-time. Quick, hit the CLR button!";

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

function clear() {
  currentNum = "";
  previousNum = "";
  operation = null;
  defaultStyles();
  updateDisplay();
 }

function deleteNum() {
  currentNum = currentNum.toString().slice(0, -1);
  updateDisplay();
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
    // 4000: "I̅V̅", // This did not render properly in the browser. 
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
  let specKeyCase;
  let topError = "";
  const current = String(currentNum);
  if (isNaN(current)) {
    return;
  } else if (current > 0 && current < 4000 && !current.includes(".")) {
      specKeyCase = romanNumeralizer(current);
  } else {
      errorStyle();
      errorLo();
      specKeyCase = errMsgRomNum;
      topError = topText;
  }
  currentNum = specKeyCase;
  previousNum = topError;
  updateDisplay();
}

function factorial(n) {
    if (n === 1) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
}; 

const capitalRomanNumeral = /[A-Z]/;

function computeFactorial() {
  let specKeyCase;
  let topError = "";
  const current = currentNum;
  if (typeof current === "number") {
    if (Number.isInteger(current) && current > 0 && current < 171) {
      specKeyCase = factorial(current);
    } else if (Number.isInteger(current) && current > 171) {
        errorStyle();
        errorMd();
        specKeyCase = errMsgTooBig
        topError = topText;
    } else {
        errorStyle();
        errorLo();
        specKeyCase = errMsgNatNum;
        topError = topText;
    }
  } else if (typeof current === "string") {
      if (current.includes(".") || current < 1 ) {
        errorStyle();
        errorLo();
        specKeyCase = errMsgNatNum;
        topError = topText;
    } else if (current > 170 ) {
        errorStyle();
        errorMd();
        specKeyCase = errMsgTooBig;
        topError = topText;
    } else if (current.match(capitalRomanNumeral)) {
        errorStyle();
        errorLo();
        specKeyCase = errMsgNatNum;
        topError = topText;
    } else {
        specKeyCase = factorial(current);
    }
  }
    currentNum = specKeyCase;
    previousNum = topError;
    updateDisplay();
}

function computePercentage() {
  defaultStyles();
  let specKeyCase;
  let topError = "";
  const current = parseFloat(currentNum);
  if (isNaN(current)) {
      errorStyle();
      errorLo();
      specKeyCase = errMsgPerNum;
      topError = topText;
  } 
  else {
    specKeyCase = current / 100;
    } 
  currentNum = specKeyCase;
  previousNum = topError;
  updateDisplay()
}

function computeTheMeaningOfLife() {
  defaultStyles();
  currentNum = 42;
  previousNum = "The meaning of life is... ";
  updateDisplay();
}

function changePositiveOrNegative() {
  let specKeyCase;
  const current = parseFloat(currentNum);
  if (isNaN(current)) {
    return;
  } else if (plmiBtn) {
    specKeyCase = current * -1;
  }
  currentNum = specKeyCase;
  updateDisplay();
}