import {Login, User} from './interface'
interface Address{
    street:string;
    city:string;
    state:string;
    pin:string;
}
class Employee implements Login{
    #id: number;
    protected name: string;
    address:Address

    Login():User{
        return {name:"John",id:1,email:""}
    }

    static getEmployeeCount():number{
        return 100;
     }


     get empId():number{
        return this.#id;    
     }

     set empId(id:number){
        this.#id=id;
     }

    constructor(id:number,name:string,address:Address){
        this.#id=id;
        this.name=name;
        this.address=address;
    }

    getNameWithAddress():string{
        return  `${this.name} stays at ${this.address}`;
    }
}



class Manager extends Employee{
    constructor(id:number,name:string,address:Address){
        super(id,name,address);
    }
    getNameWithAddress(): string {
        return `Manager ${this.name} stays at ${this.address}`;
    }

}

let john = new Employee(1,"John",{street:"ABC",city:"Bangalor",state:"Karanta",pin:"41233"});

// Employee.getEmployeeCount();
john.empId=100;
console.log(john.empId);

let address=john.getNameWithAddress();
// john.id=1;  
// john.name="John Doe";
// john.address="123 Main Street";

// let mike=new Manager(2,"Mike","456 Main Street");

// console.log(mike.getNameWithAddress());


