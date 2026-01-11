// примитивные типы данных
let age: number;

age = 12;

let username: string;
username = "Sardar";

let isInstructor: boolean;

isInstructor = true;
// так обозначается тип данных где используются массивы
let hobbies: string[];

hobbies = ["sports", "cooking", "swimming"];
// определение типов для объектов
// let person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     isDriver: boolean;
// };

// person = {
//     name: "Dmitri",
//     age: 35,
//     hobbies: ["sports", "cooking", "swimming"],
//     isDriver: true,
// };

// определение типов для обьекта , которые находятся в массиве

let people: {
    name: string;
    age: number;
}[];

people = [
    {
        name: "asdasd",
        age: 123,
    },
];

//type inference
// написание типов через черту , позволяет  использовать комбинации типов названиеися Union Types
let course: string | number = "React";
course = 20;

//Type Alias - концепция позволяющая создавать собственные типы данных

type Person = {
    name: string;
    age: number;
    hobbies: string[];
    isDriver: boolean;
};
let person: Person;
person = {
    name: "Dmitri",
    age: 35,
    hobbies: ["sports", "cooking", "swimming"],
    isDriver: true,
};

// functions & types

function add(a: number, b: number): number {
    return a + b;
}

// данная функция фактически ничего не возвращает поэтому тип вывода у неё :void
// :void сопоставим с null или undefined, но используется он только в функциях

function printOutput(value: any) {
    console.log(value);
}

// Generics <>

function insertAtBeginning<T> (array:T[], value: T) {
    const newArray = [value,...array]
    return newArray
}

const demoArray = [1,2,3]
const updateArray = insertAtBeginning(demoArray,-1)
console.log(updateArray);
const stringArray = insertAtBeginning(["a","b","c"], "d")

stringArray[0].split("")

