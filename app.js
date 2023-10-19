let num1;
let num2;
let operator;
const display = document.querySelector(".display");



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
    if (regex.test(key)) {
        display.textContent=display.textContent+key;
    }
    // if (!isNaN(key)) {
        
    // }
    if (key == "Backspace") {
        display.textContent = display.textContent.slice(0, -1);
    }
    if (key === "=" || key === "Enter") {
        calculation();
    }
});

// Figure out how to make regex work with split function and indexOf function
function calculation() {
    let str = display.textContent.slice(0, -1);
    const arr = str.split(/[+-\/*xX÷]/g);
    console.table(arr);
    num1 = arr[0];
    num2 = arr[1];
    operator = display.textContent.charAt(display.textContent.search(/[\/*+\-xX÷]/));
    return console.log(operate(num1, operator, num2));
}

