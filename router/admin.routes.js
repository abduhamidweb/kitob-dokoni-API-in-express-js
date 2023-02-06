import express from "express";
const adminRouter = express.Router();
import fs from 'fs';
let books = JSON.parse(fs.readFileSync(process.cwd() + "/data/books.json", "utf-8"));
console.log('books :', books);

adminRouter.get("/kitob", (req, res) => {})
export default adminRouter;