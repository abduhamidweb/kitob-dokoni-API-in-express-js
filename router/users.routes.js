import express from "express";
const userRoute = express.Router();
import fs from 'fs';
let books = JSON.parse(fs.readFileSync(process.cwd() + "/data/books.json", "utf-8"));
let booksId = books.map(book => book.id)
userRoute
    .get("/kitob", (req, res) => {
        res.status(200).send(books)
    })
    .get("/kitob/:id", (req, res) => {
        let {
            id
        } = req.params;
        const book = books.filter(book => book.id * 1 == id * 1)
        res.status(200).send(book)
    })
export default userRoute;