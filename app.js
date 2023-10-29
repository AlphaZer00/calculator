let num1;
let num2;
let operator;
let clearButtonPressed = false;
let memory = "";
let key = "";
let text = "";

const display = document.querySelector(".display");
const acButton = document.querySelector(".ac");
const cButton = document.querySelector(".c");
const mathButtons = document.querySelector(".math-buttons");
const equalsButton = document.querySelector(".equals");

acButton.addEventListener("click", clearMem);
cButton.addEventListener("click", clearDisplay);
equalsButton.addEventListener("click", calculation);

//This function makes stores button click inputs and calls manageMemory
mathButtons.addEventListener("click", (e) => {
    text = e.target.textContent;
    manageMemory("m");
});

//This function stores key inputs and calls manageMemory
document.body.addEventListener("keydown", function(e) {
    key = e.key;
    manageMemory("k");
});

function manageMemory(eventType) {
    const isCalcButton = /[*0-9xX+\/÷=+\-.%]/;
    const isNumber = /[0-9\.]/g;
    const isOperator= /[\/*+\-xX÷]/g;
    let operatorPressed = false;
    let backspacePressed = false;
    console.log(memory);
    if (key === "Backspace" && eventType == "k" || text === "⌫" && eventType === "m") {
        memory = memory.toString().slice(0, -1);
        display.textContent = display.textContent.toString().slice(0, -1);
        backspacePressed = false;
    }
    if (eventType === "k" && !isCalcButton.test(key) || eventType === "m" && !isCalcButton.test(text)) return;

    if (eventType === "m" && text.length == 1 && isCalcButton.test(text)) {
        memory += text;
    }

    if (eventType === "k" && isCalcButton.test(key)) {
        memory += key;
    }

    if (isOperator.test(memory.charAt(memory.length - 1))) {
        operatorPressed = true;
    }

    if (operatorPressed) {
        display.textContent = "";
        if (isOperator.test(memory.charAt(memory.length - 1))) {
            memory.slice(0,-1);
        } else if (isNumber.test(memory.charAt(memory.length - 1))) {
            display.textContent += memory.charAt(memory.length - 1);
        }
        operatorPressed = false;
    } else if (!operatorPressed) {
        if (isCalcButton.test(memory.charAt(memory.length - 1))) {
            display.textContent += memory.charAt(memory.length - 1);
        }
    }

    if (memory.charAt(memory.length - 1) === "=") {
        memory = memory.slice(0, -1);
        display.textContent = display.textContent.slice(0, -1);
        calculation();
    }
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, operator, num2) {
    num1 = +num1;
    num2 = +num2;
    if (operator ==="+") {
        return add(num1, num2);
    } else if (operator === "-") {
        return subtract(num1, num2); 
    } else if (operator === "*" || operator === "x" || operator === "X") {
        return multiply(num1, num2);
    } else if (operator === "/" || operator === "÷") {
        return divide(num1, num2);
    }
}

function calculation() {
    console.log(memory);
    let myArray =createArray(memory);
    console.log(myArray);
    if (clearButtonPressed == true) {
        myArray = [];
        memory = '';
        clearButtonPressed = false;
        display.textContent = myArray.toString();
        return;
    } 

    let operatorsArray=getOperatorsArray();
    console.log(operatorsArray);
    let length = myArray.length;
    for (let i=0; i<length-1 ; i++) {
        operator = operatorsArray[0];
        deleteFirstElement(operatorsArray);
        console.log(operator);
        getNumberValues(myArray);
        simplifyArray(myArray);
        memory = myArray[0];
        console.log(myArray);
    }
    
    display.textContent=Math.round(myArray[0] * 1000) / 1000;
    if (display.textContent === "Infinity") {
        display.textContent = "ERR: Divide by 0";
    }
}

function getNumberValues(arr) {
    num1 = arr[0];
    num2 = arr[1];
}

function simplifyArray(arr) {
    myArray = arr.splice(0, 2, operate(num1, operator, num2));
    console.log(myArray);
    return myArray;
}

function deleteFirstElement(arr) {
    arr.shift();
    return arr;
}

function clearMem() {
    memory = "";
    display.textContent = "";
    clearButtonPressed = false;
}

function clearDisplay() {
    display.textContent = "";
}

function createArray(string) {
    let str = string;
    const arr = str.split(/[+-\/*xX÷=]/g);
    return arr;
}

function getOperatorsArray() {
    operator = memory.match(/[\/*+\-xX÷]/g);
    return operator;
}