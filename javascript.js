
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
      } 
      else if (isNaN(currentNum)) {
        return;
      }  
      else {
        currentNum = currentNum.toString() + numButton.toString(); // ***NEED TO GRASP THIS LINE...
      } 
}

function appendOper(operButton) {
  if (currentNum === "" || isNaN(currentNum)) {
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
  // displayCurrNum.setAttribute("style", "font-size: 16px");
  displayCurrNum.style.fontSize = "16px";
  displayCurrNum.style.textAlign = "right"; 
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
  console.log(`currentNum is ${currentNum} and is a ${typeof currentNum}`);
  operation = undefined;
  previousNum = "";
    displayCurrNum.style.fontSize = "16px";
    displayCurrNum.style.textAlign = "right"; 
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

  // function addCombiningOverline(text) {
  //   // Combining Overline (U+0305)
  //   const combiningOverline = "\u0305";

  //   // Concatenate the base text and the combining overline
  //   return text + combiningOverline;
  // }

  const keyValueRoman = {
    // 9000: "IX",
    // 8000: "VIII",
    // 7000: "VII",
    // 6000: "VI",
    // 5000: "V",
    // 4000: "IV",
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

  // // Keys to apply the vinculum effect
  // const keysWithVinculum = [4000, 5000, 6000, 7000, 8000, 9000];

  // // Loop through the keys and update the values in the object
  // keysWithVinculum.forEach((key) => {
  //   if (keyValueRoman.hasOwnProperty(key)) {
  //     keyValueRoman[key] = addCombiningOverline(keyValueRoman[key]);
  //   }
  // });

  // // Display the modified object
  // console.log(keyValueRoman);

  const answer = holder.map((value) => keyValueRoman[value]);
  return answer.join("");
}
  console.log(`Max Roman Numeral is ${romanNumeralizer(3999)}`);

function computeRomanNumeral() {
  let specKeyCase;
  const current = String(currentNum);
  console.log(`Current is ${current} and is a ${typeof current}`);
  // console.log(typeof current);
  if (isNaN(current)) {
    return;
  } else if (current > 0 && current < 3999 && !current.includes(".")) {
    specKeyCase = romanNumeralizer(current);
    console.log(specKeyCase);
  } else {
        displayCurrNum.style.fontSize = "12px";
        displayCurrNum.style.textAlign = "left"; 
    specKeyCase = "Please use only natural numbers; maximum allowed is 3999.";
  }
console.log(`Current is ${current} and is a ${typeof current}`);
  currentNum = specKeyCase;
  updateDisplay();
  console.log(`Current is ${current} and is a ${typeof current}`);
}

function factorial(n) {
    if (n === 1) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
}; 

// function computeFactorial() {
//   let specKeyCase;
//   const current = currentNum;
//   if (isNaN(current) || current < 1 || current.includes(".")) {
//     // return;
//     displayCurrNum.style.fontSize = "12px";
//     displayCurrNum.style.textAlign = "left"; 
//     specKeyCase = "Please input natural numbers only. Click CLR Button."
//   } else if (current > 170) {
//     // return;
//     displayCurrNum.style.fontSize = "12px";
//     displayCurrNum.style.textAlign = "left"; 
//     specKeyCase = "Result too large to represent accurately. Click CLR Button."

//   } else {
//     let holder = parseInt(current)
//     specKeyCase = factorial(holder);
//     console.log(specKeyCase);
//   }
//   currentNum = specKeyCase;
//   updateDisplay();
// }

function computeFactorial() {
  let specKeyCase;
  const current = currentNum;
if (Number.isInteger(current) && current > 0 && current < 171) {
  specKeyCase = factorial(current);
}

else if (Number.isInteger(current) && current > 171) {
  displayCurrNum.style.fontSize = "12px";
  displayCurrNum.style.textAlign = "left";
  specKeyCase = "Result too large to represent accurately. Click CLR Button.";
} 

else if (!isNaN(current) || current < 1 || current.includes(".")) {

  displayCurrNum.style.fontSize = "12px";
  displayCurrNum.style.textAlign = "left";
  specKeyCase = "Please input natural numbers only. Click CLR Button.";
} else if (isNaN(current)) {

  displayCurrNum.style.fontSize = "12px";
  displayCurrNum.style.textAlign = "left";
  specKeyCase = "Please input natural numbers only. Click CLR Button.";
} else if (current > 170) {

  displayCurrNum.style.fontSize = "12px";
  displayCurrNum.style.textAlign = "left";
  specKeyCase = "Result too large to represent accurately. Click CLR Button.";
} else {
  let holder = current;
  specKeyCase = factorial(holder);
  console.log(specKeyCase);
}
  currentNum = specKeyCase;
  updateDisplay();
}

function computePercentage() {
  let specKeyCase;
  const current = parseFloat(currentNum);
  if (isNaN(current)) {
    displayCurrNum.style.fontSize = "12px";
    displayCurrNum.style.textAlign = "left"; 
    specKeyCase = "Percentages only work with numbers. Click CLR Button.";
  } 
  else {
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
  const current = 42;
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