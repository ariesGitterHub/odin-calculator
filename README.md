# odin-calculator

## Assignment
Don’t forget to commit early & often! [You can reference the Commit Message lesson here!](https://www.theodinproject.com/lessons/foundations-commit-messages)

Here are some use cases (abilities your project needs to have):

1. ☑ Your calculator is going to contain functions for all of the basic math operators you typically find on calculators, so start by creating functions for the following items and testing them in your browser’s console.
- add
- subtract
- multiply
- divide
2. ☑ A calculator operation will consist of a number, an operator, and another number. For example, 3 + 5. Create three variables for each of the parts of a calculator operation. Create a variable for the first number, the operator, and the second number. You’ll use these variables to update your display later.
3. ☑ Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions on the numbers.
4. ☑ Create a basic HTML calculator with buttons for each digit, each of the above functions and an “Equals” key.
- Do not worry about wiring up the JS just yet.
- There should also be a display for the calculator. Go ahead and fill it with some dummy numbers so it looks correct.
- Add a “clear” button.
5. ☑ Create the functions that populate the display when you click the number buttons. You should be storing the ‘display value’ in a variable somewhere for use in the next step.
6. ☑ Make the calculator work! You’ll need to store the first number and second number that are input into the calculator, utilize the operator that the user selects, and then operate() on the two numbers when the user presses the “=” key.
- You should already have the code that can populate the display, so once operate() has been called, update the display with the ‘solution’ to the operation.
- This is the hardest part of the project. You need to figure out how to store all the values and call the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.
7. ☑ Gotchas: watch out for and fix these bugs if they show up in your code:
- Users should be able to string together several operations and get the right answer, with each pair of numbers being evaluated at a time. For example, 12 + 7 - 5 * 3 = should yield 42. An example of the behavior we’re looking for would be [this student solution](https://mrbuddh4.github.io/calculator/).
- Your calculator should not evaluate more than a single pair of numbers at a time. Example: you press a number button (12), followed by an operator button (+), a second number button (7), and finally a second operator button (-). Your calculator should then do the following: first, evaluate the first pair of numbers (12 + 7), second, display the result of that calculation (19), and finally, use that result (19) as the first number in your new calculation, along with the next operator (-).
- You should round answers with long decimals so that they don’t overflow the screen.
- Pressing = before entering all of the numbers or an operator could cause problems!
- Pressing “clear” should wipe out any existing data.. make sure the user is really starting fresh after pressing “clear”
- Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator!
### Extra credit
- Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. Add a . button and let users input decimals! Make sure you don’t let them type more than one though: 12.3.56.5. It is hard to do math on these numbers. (disable the decimal button if there’s already one in the display)
- Make it look nice! This is a great project to practice your CSS skills. At least make the operations a different color from the keypad buttons.
- Add a “backspace” button, so the user can undo if they click the wrong number.
- Add keyboard support! You might run into an issue where keys such as (/) might cause you some trouble. Read the [MDN documentation for event.preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) to help solve this problem.

## Vinculum Problem with Roman Numerals
I was not able to work out Roman Numerals higher than 3999, as a ["vinculum"](https://en.wikipedia.org/wiki/Vinculum_(symbol)) is needed to differentiate the higher value. Despite my efforts using Chrome Linux, I simply could not get the vinculum line to render in the browser. Note that it might have worked in other browsers though. This is possibly something to work on (maybe) at a later date. 

The following are useful websites for understanding higher number Roman numerals (e.g., 4000, 5000, 6000, etc.)

- [Large Numbers in Roman Numerals](https://romannumerals.guide/how-roman-numerals-work#large-numbers)
- [4000 in Roman Numerals](http://www.romannumerals.co/number-converter/4000-in-roman-numerals/)

Fun fact: The Romans did not use the same symbol more than three times in a row (source: https://www.livescience.com/32052-roman-numerals.html). This is why MMMM cannot be used for 4000, rather a vinculum line is needed above the, so I̅V̅.

TO-DO
- Clicking TMOl, then an operator, then TMOL again, breaks the calculator, forcing one to CLR.