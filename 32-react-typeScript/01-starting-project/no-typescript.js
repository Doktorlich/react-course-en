function add(a, b) {
    return a + b;
}

const result = add("2", "5");

console.log(result);

let arr1 = ["sports", "cooking", "swimming"];
let arr2 = [
    {
        0: "sports",
    },
    {
        1: "cooking",
    },
    {
        2: "swimming",
    },
];

console.log({ ...arr2 });
