console.log("=== Function Declaration ===");
try {
    console.log("Before definition:", add(2, 3)); // Works due to hoisting
} catch (err) {
    console.log("Error before definition:", err.message);
}

function add(a, b) {
    return a + b;
}

console.log("After definition:", add(5, 7)); // Works normally


console.log("\n=== Function Expression ===");
try {
    console.log("Before definition:", multiply(2, 3)); // Fails
} catch (err) {
    console.log("Error before definition:", err.message);
}

const multiply = function (a, b) {
    return a * b;
};

console.log("After definition:", multiply(5, 7)); // Works after assignment
