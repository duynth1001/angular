"use strict";
function add(num1, num2, num3) {
    return num3 ? num1 + num2 + num3 : num1 + num2;
}
console.log(add(2, 3));
console.log(add(2, 3, 6));
const sub = (num1, num2, num3 = 10) => num1 - num2 - num3;
console.log(sub(2, 3));
console.log(sub(2, 3, 5));
const mult = function (num1, num2) {
    return num1 * num2;
};
function add2(num1, num2, ...num3) {
    return num3.reduce((acc, num) => acc + num, 0) + num1 + num2;
}
let numbers = [5, 6, 7];
console.log(add2(2, 3, ...[5, 6, 7]));
function getItems(items) {
    return new Array().concat(items);
}
let concatResult = getItems([1, 2, 3, 4, 5]);
let concatString = getItems(["Hello", "World"]);
//# sourceMappingURL=function.js.map