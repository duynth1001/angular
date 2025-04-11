let Lname :string;

Lname ="Duy";

let newname=Lname.toUpperCase();

console.log(newname);

let age:number

age=25;
age=25.3;

let dob="25";
let result = parseInt(dob);

let isValid:boolean=false;

console.log(isValid);

let empList :string[];

empList=["Duy","Huy","Tuy"];

let numList :Array<number>;

numList=[1,2,3,4,5];

// let newNum = numList[5];

let results = numList.filter((num)=>num>2);

console.log(results);

let emp =empList.find((emp)=>emp==='Tuy');

let sum = numList.reduce((acc,num)=>acc+num,0);

console.log(emp);

console.log(sum);


// lname=10;

const enum Color{
    Red,
    Green,
    Blue
}

let c:Color=Color.Blue;

let swapNumbs :[number,number];

function swapNumbers(num1:number,num2:number):[number,number]{
    return [num2,num1]
}

swapNumbs=swapNumbers(10,20);

swapNumbs[0];
swapNumbs[1];

let departmant:any;

departmant="IT";
departmant=10;