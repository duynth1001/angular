"use strict";
let Lname;
Lname = "Duy";
let newname = Lname.toUpperCase();
console.log(newname);
let age;
age = 25;
age = 25.3;
let dob = "25";
let result = parseInt(dob);
let isValid = false;
console.log(isValid);
let empList;
empList = ["Duy", "Huy", "Tuy"];
let numList;
numList = [1, 2, 3, 4, 5];
// let newNum = numList[5];
let results = numList.filter((num) => num > 2);
console.log(results);
let emp = empList.find((emp) => emp === 'Tuy');
let sum = numList.reduce((acc, num) => acc + num, 0);
console.log(emp);
console.log(sum);
let c = 2 /* Color.Blue */;
let swapNumbs;
function swapNumbers(num1, num2) {
    return [num2, num1];
}
swapNumbs = swapNumbers(10, 20);
swapNumbs[0];
swapNumbs[1];
let departmant;
departmant = "IT";
departmant = 10;
//# sourceMappingURL=datatypes.js.map