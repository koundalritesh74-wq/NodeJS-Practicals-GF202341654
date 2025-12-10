// Higher Order Function
function calculate(operation, a, b) {
    return operation(a, b);
}

// Some operation functions
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

const multiply = (x, y) => x * y;
const divide = (x, y) => (y !== 0 ? x / y : "Cannot divide by zero");

// === Testing calculate ===
console.log("Addition:", calculate(add, 10, 5));          // 15
console.log("Subtraction:", calculate(subtract, 10, 5)); // 5
console.log("Multiplication:", calculate(multiply, 4, 5)); // 20
console.log("Division:", calculate(divide, 20, 4));        // 5

// Inline anonymous function
console.log("Power:", calculate((x, y) => x ** y, 2, 3)); // 8
