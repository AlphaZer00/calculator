let num1;
let num2;
let operator;
const display = document.querySelector("display");



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
        return console.log(key);
    };
});
