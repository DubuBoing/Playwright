import { expect, type Locator, type Page } from '@playwright/test';
// Install TypeScript = npm install --save-dev typescript
// Install TypeScript globally = npm install -g typescript (For tsc command to work)
// Running via JS = node JStoTS.js (node [folder]/file.js) but needs file to be in JS format
// Running via TS = node JStoTS.ts (node [folder]/file.ts)
// Convert TS to JS = tsc JStoTS.ts


let message : string = "Hello, TypeScript!";
// let message = "Hello, TypeScript!"; // JS
console.log(message);

let age : number = 25;
// let age = 25; // JS
console.log("Age:", age);

let isStudent : boolean = true;
// let isStudent = true; // JS  
console.log("Is Student:", isStudent);

let numbers : number[] = [1, 2, 3, 4, 5];
// let numbers = [1, 2, 3, 4, 5]; // JS
console.log("Numbers:", numbers);

let data : any = "Could be anything";
// let data = "Could be anything"; // JS
console.log("Data:", data);

function add(a: number, b: number): number { // : number specifies return type
    return a + b;
}
add(5, 10);
// function add(a, b) { // JS
//     return a + b;
// }
// add(5, 10);
console.log("Sum:", add(5, 10));

let user : { name: string; age: number } = { name: "Alice", age: 30 };
// let user = { name: "Alice", age: 30 }; // JS
console.log("User:", user);

class CartPage{
    page: Page;
    cartItems: Locator;
    checkOut: Locator;
    constructor(page: any){
        this.page = page;
        this.cartItems = page.locator('div li');
        this.checkOut = page.locator("text=Checkout");
    }
}
// class CartPage{ // JS
//     constructor(page){
//         this.page = page; 
//         this.cartItems = page.locator('div li');
//         this.checkOut = page.locator("text=Checkout");
//     }
// }