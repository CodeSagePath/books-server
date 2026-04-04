// importing dependencies
const express = require("express");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Server Configuration
const HOSTNAME = "127.0.0.1";
const PORT = "3000";

// Sample Data
const books = [
  {
    id: 1,
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    genre: "Science Fiction",
    year: 1979,
    rating: 4.8,
    available: true,
  },
  {
    id: 2,
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    year: 1965,
    rating: 4.9,
    available: false,
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    year: 1949,
    rating: 4.7,
    available: true,
  },
  {
    id: 4,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Philosophical",
    year: 1988,
    rating: 4.3,
    available: true,
  },
  {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-help",
    year: 2018,
    rating: 4.6,
    available: true,
  },
  {
    id: 6,
    title: "The Shining",
    author: "Stephen King",
    genre: "Horror",
    year: 1977,
    rating: 4.5,
    available: false,
  },
  {
    id: 7,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "History",
    year: 2011,
    rating: 4.7,
    available: true,
  },
];

// GET all Books
app.get("/books", (req, res) => {
  if (Object.keys(req.query).length === 0) {
    return res.status(200).send(books);
  } else {
    return res.status(404).send("Logic not Implemented yet.");
  }
});

// Starting the server
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running at http://${HOSTNAME}:${PORT}/`);
});
