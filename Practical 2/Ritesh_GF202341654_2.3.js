const obj = {
    name: "MyObject",

    // Normal function
    normalFunc: function () {
        console.log("Normal Function this:", this);
    },

    // Arrow function
    arrowFunc: () => {
        console.log("Arrow Function this:", this);
    }
};

console.log("=== Calling methods ===");
obj.normalFunc(); // 'this' refers to obj
obj.arrowFunc();  // 'this' does not refer to obj
