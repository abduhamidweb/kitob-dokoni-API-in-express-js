import express from "express";
const adminRouter = express.Router();
import fs from 'fs';
let books = JSON.parse(fs.readFileSync(process.cwd() + "/data/books.json", "utf-8"));

adminRouter.get("/kitob", (req, res) => {
        res.status(200).send(books);
    })
    .get("/kitob/:id", (req, res) => {
        let {
            id
        } = req.params;
        const book = books.filter(book => book.id * 1 == id * 1)
        res.status(200).send(book)
    }).put("/kitob/:id", (req, res) => {
        let {
            id
        } = req.params;
        let book = books.find((u) => u.id == id);
        if (!book) throw new Error("Not found " + id + "-user");
        const {
            title,
            author,
            genre,
            year,
            price,
        } = req.body;
        if (
            !title ||
            !author ||
            !genre ||
            !year ||
            !price
        )
            throw new Error("Not found maqsad!");
        book.title = title ? title : book.title;
        book.author = author ? author : book.author;
        book.genre = genre ? genre : book.genre;
        book.year = year ? year : book.year;
        book.price = price ? price : book.price;
        fs.writeFileSync(process.cwd() + "/data/books.json", JSON.stringify(books, null, 4))
        res.end("User " + id + " updated!");
    }).post("/kitob", (req, res) => {
        const {
            title,
            author,
            genre,
            year,
            price,
        } = req.body;
        if (
            !title &&
            !author &&
            !genre &&
            !year &&
            !price
        )
            throw new Error("Not found maqsad!");
        req.body.id = books.length ? books[books.length - 1].id + 1 : 1;
        books.push(req.body);
        fs.writeFileSync(
            process.cwd() + "/data/books.json",
            JSON.stringify(books, null, 4)
        );
        res.jsonp({
            ok: true
        }).status(200);

    }).delete("/kitob/:id", (req, res) => {
        let {
            id
        } = req.params;
        const find = books.find((b) => b.id == id);
        if (!find) {
            res.jsonp({
                ok: false
            }).status(404);
        }
        books = books.filter((b) => b.id != id);
        fs.writeFileSync(
            process.cwd() + "/data/books.json",
            JSON.stringify(books, null, 4)
        );
        res.jsonp({
            ok: true,
        }).json(200)
    })
export default adminRouter;