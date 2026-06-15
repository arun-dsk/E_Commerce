
import fs from "fs";
import Products from "../data/products.ts"; 
const json = JSON.stringify(Products, null, 2);

fs.writeFileSync("products.json", json);

console.log("products.json created successfully");