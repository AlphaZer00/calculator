let num1;
let num2;
let operator;
let clearButtonPressed = false;

const display = document.querySelector(".display");
const acButton = document.querySelector(".ac");
const cButton = document.querySelector(".c");

acButton.addEventListener("click", clearMem);
cButton.addEventListener("click", clearDisplay);

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
    } else if (operator === "*") {
        return multiply(num1, num2);
    } else if (operator === "/" || operator === "÷") {
        return divide(num1, num2);
    }
}

document.body.addEventListener("click", handleClick());

function handleClick() {
    
}

document.body.addEventListener("keydown", function(e) {
    let key = e.key;
    const regex = /[*0-9xX\/÷=+-\.%]/g;
    if (display.textContent == "ERR: Divide by 0") {
        return;
    }
    if (regex.test(key)) {
        display.textContent=display.textContent+key;
    }

    if (key == "Backspace") {
        display.textContent = display.textContent.slice(0, -1);
    }
    if (key === "=" || key === "Enter") {
        calculation();
    }
});

function createArray(string) {
    let str = string;
    const arr = str.split(/[+-\/*xX÷]/g);
    return arr;
}
function getOperatorsArray() {
    operator = display.textContent.match(/[\/*+\-xX÷]/g);
    return operator;
}

function calculation() {
    let myArray =createArray(display.textContent.slice(0, -1));
    if (clearButtonPressed == true) {
        myArray = [];
        clearButtonPressed = false;
        display.textContent = myArray;
        console.log(myArray);
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
    }
    
    display.textContent=Math.round(myArray[0] *1000) / 1000;
    if (display.textContent === "Infinity") {
        display.textContent = "ERR: Divide by 0";
    }
}

function getNumberValues(arr) {
    num1 = arr[0];
    num2 = arr[1];
}

function simplifyArray(arr) {
    console.log(arr);
    myArray =arr.splice(0, 2, operate(num1, operator, num2));
    return myArray;
}

function deleteFirstElement(arr) {
    arr.shift();
    return arr;
}

function clearMem() {
    clearButtonPressed =true;
    calculation();
}

function clearDisplay() {
    display.textContent = "";
}