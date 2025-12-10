console.log("=== Hoisting with var ===");
console.log(a);   // Access before declaration
var a = 10;
console.log(a);   // After assignment

console.log("\n=== Hoisting with let ===");
try {
    console.log(b);   // Access before declaration
} catch (err) {
    console.log("Error:", err.message);
}
let b = 20;
console.log(b);

console.log("\n=== Hoisting with const ===");
try {
    console.log(c);   // Access before declaration
} catch (err) {
    console.log("Error:", err.message);
}
const c = 30;
console.log(c);
