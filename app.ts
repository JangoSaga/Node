const express = require('express');
import type { Express, Request, Response } from 'express';

const app: Express = express();

const BOOKS = [
	{ id: 1, title: "The Pragmatic Programmer", author: "Andrew Hunt, David Thomas", year: 1999 },
	{ id: 2, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
	{ id: 3, title: "You Don't Know JS", author: "Kyle Simpson", year: 2015 },
	{ id: 4, title: "Eloquent JavaScript", author: "Marijn Haverbeke", year: 2018 },
	{ id: 5, title: "Design Patterns", author: "Erich Gamma et al.", year: 1994 }
]

app.get("/api/books", (req: Request, res: Response) => {
	res.json(BOOKS);
});
app.get("/api/books/:id", (req: Request, res: Response) => {
  const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const bookId = parseInt(idParam, 10);
  const book = BOOKS.find(b => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  } 
})  
app.post("/api/books", (req: Request, res: Response) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const newBook = {
    id: BOOKS.length + 1,
    title,
    author,
    year
  };
  BOOKS.push(newBook);
  res.status(201).json(newBook);
});
app.put("/api/books/:id", (req: Request, res: Response) => {
  const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const bookId = parseInt(idParam, 10);
  const bookIndex = BOOKS.findIndex(b => b.id === bookId);
  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  BOOKS[bookIndex] = { ...BOOKS[bookIndex], title, author, year };
  res.json(BOOKS[bookIndex]);
});
app.delete("/api/books/:id", (req: Request, res: Response) => {
  const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const bookId = parseInt(idParam, 10);
  const bookIndex = BOOKS.findIndex(b => b.id === bookId);
  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }
  BOOKS.splice(bookIndex, 1);
  res.json({ message: "Book deleted" });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
})