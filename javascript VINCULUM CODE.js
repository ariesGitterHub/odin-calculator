
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

// const currNum = document.querySelector(".current-number");
// const prevNum = document.querySelector(".previous-number");

// const display = document.querySelector("display-container");

const numBtn = document.querySelectorAll(".number"); // includes "."
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
delBtn.addEventListener("click", deleteNumOrOper);
equBtn.addEventListener("click", computeIt);
// dotButton.addEventListener("click", appendDot);

spqrBtn.addEventListener("click", computeRomanNumeral);
percBtn.addEventListener("click", computePercentage);
factBtn.addEventListener("click", computeFactorial);
tmolBtn.addEventListener("click", computeTheMeaningOfLife);
plmiBtn.addEventListener("click", changePositiveOrNegative);

let currentNum = "";
let previousNum = "";
let operation = null;

const capitalRomanNumeral = /[A-Z]/;

function updateDisplay() {
  displayCurrNum.innerText = currentNum;
  displayPrevNum.innerText = previousNum + " " + (operation || "");
}

function appendNum(numButton) {
    console.log(numButton);
      if (numButton === "." && currentNum.includes(".")) {
        return; // Stops multiple decimals
      } else {
        currentNum = currentNum.toString() + numButton.toString(); // ***NEED TO GRASP THIS LINE...
      } 
}

function appendOper(operButton) {
  if (currentNum === "") {
    return;
  }
  else if (previousNum !== "") {
    computeIt();
  }
  operation = operButton;
  previousNum = currentNum;
  currentNum = "";
}



function clear() {
  currentNum = "";
  previousNum = "";
  operation = null;
  updateDisplay();
  displayCurrNum.setAttribute("style", "font-size: 14px");
}

function deleteNumOrOper() {
  console.log("Before deletion:", currentNum);
  currentNum = currentNum.toString().slice(0, -1);
  console.log("After deletion:", currentNum);
  updateDisplay();
}

function computeIt() {
  let computation;
  const prev = parseFloat(previousNum);
  const current = parseFloat(currentNum);
  if (isNaN(prev) || isNaN(current)) {
    return;
  }
  else {
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
  updateDisplay(); // Refresh the display with the new state
}
}

// function isNaturalNum(n) {
//   if (typeof n !== "number") return "Not a number";
//   return n >= 0.0 && Math.floor(n) === n && n !== Infinity;
// }

// console.log(isNaturalNum(-1));
// console.log(isNaturalNum(1.1));
// console.log(isNaturalNum(-1.1));

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

  //TRYING TO GET VINCULUM OVER 4000, 5000, 6000, 7000, 8000, 9000...THIS CODE NOT WORKING IN LINUX...OUTPUTS BLANK CHARACTERS. MIGHT OTHERWISE WORK.

  function addCombiningOverline(text) {
    // Combining Overline (U+0305)
    const combiningOverline = "\u0305";

    // Concatenate the base text and the combining overline
    // return text + combiningOverline; // Original
    return text + String.fromCharCode(0) + combiningOverline; // Do both work? One above or this line, or both?
  }

  const keyValueRoman = {
    9000: "IX",
    8000: "VIII",
    7000: "VII",
    6000: "VI",
    5000: "V",
    4000: "IV",
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

  // Keys to apply the vinculum effect
  const keysWithVinculum = [4000, 5000, 6000, 7000, 8000, 9000];

  // Loop through the keys and update the values in the object
  keysWithVinculum.forEach((key) => {
    if (keyValueRoman.hasOwnProperty(key)) {
      keyValueRoman[key] = addCombiningOverline(keyValueRoman[key]);
    }
  });

  // Display the modified object
  console.log(keyValueRoman);

  const answer = holder.map((value) => keyValueRoman[value]);
  return answer.join("");
}
  console.log(`Max Roman Numeral is ${romanNumeralizer(9999)}`);

function computeRomanNumeral() {
  let specKeyCase;
  const current = currentNum;
  console.log(`Current is ${current} and is a ${typeof current}`);
  // console.log(typeof current);
  if (isNaN(current)) {
    return;
  } else if (spqrBtn && current > 0 && current < 9999 && !current.includes(".")) {
    specKeyCase = romanNumeralizer(current);
    console.log(specKeyCase);
  } else {
    displayCurrNum.setAttribute("style", "font-size: 12px");
    specKeyCase = "Use only natural numbers; maximum number = 9999";
  }
console.log(`Current is ${current} and is a ${typeof current}`);
  currentNum = specKeyCase;
  updateDisplay();
  console.log(`Current is ${current} and is a ${typeof current}`);
}

function factorial(n) {
  if (n ===1) {
    return 1;
  }
  else {
    return n * factorial(n - 1);
  }
}; 

function computeFactorial() {
  let specKeyCase;
  const current = parseFloat(currentNum);
  if (isNaN(current)) {
    return;
  } else if (factBtn && currentNum >= 1) {
    specKeyCase = factorial(current);
    console.log(specKeyCase);
  }
  currentNum = specKeyCase;
  updateDisplay();
}

function computePercentage() {
  let specKeyCase;
  const current = parseFloat(currentNum);
  if (isNaN(current)) {
    return;
  } 
  else if (percBtn) {
    specKeyCase = current / 100;
    console.log(specKeyCase);
  } 
  currentNum = specKeyCase;
  updateDisplay()
}

// function computeTheMeaningOfLife() {
//   let specKeyCase;
//   const current = parseFloat(currentNum);
//   if (isNaN(current)) {
//     return;
//   } else if (tmolBtn) {
//     specKeyCase = 42;
//     console.log(specKeyCase);
//   }
//   currentNum = specKeyCase;
//   updateDisplay();
// }
function computeTheMeaningOfLife() {
  const current = "42";
  currentNum = current;
  updateDisplay();
}

function changePositiveOrNegative() {
  let specKeyCase;
  const current = parseFloat(currentNum);
  if (isNaN(current)) {
    return;
  } else if (plmiBtn) {
    specKeyCase = current * -1;
    console.log(specKeyCase);
  }
  currentNum = specKeyCase;
  updateDisplay();
}

// function updateDisplay() {
//   displayCurrNum.innerText = currentNum;
//   displayPrevNum.innerText = previousNum + " " + (operation || "");
// }