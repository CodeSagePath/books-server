// Simple Express server for managing courses with CORS enabled
const express = require("express");
const app = express();

// Importing CORS middleware to handle Cross-Origin Resource Sharing
const cors = require("cors");

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

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


// Helper function to Validate the book data (basic validation)
const hasRequiredFields = (book) => {
  return (
    typeof book.title === "string" &&
    typeof book.author === "string" &&
    typeof book.genre === "string" &&
    typeof book.year === "number" &&
    typeof book.rating === "number" &&
    typeof book.available === "boolean"
  );
};


// GET all Books
app.get("/books", (req, res) => {
  if (Object.keys(req.query).length === 0) { // If there are no query parameters, return all books
    return res.status(200).send(books);
  } else { // If there are query parameters, filter the books based on the parameters
    const filteredBooks = books.filter((book) => {
      for (let key in req.query) {
        // Check if the book has the key and if its value matches the query parameter
        if (book[key] === undefined || book[key].toString() !== req.query[key]) {
          return false;
        }
      }

      // If all query parameters match, include the book in the filtered results
      return true;
    });

    // Return the filtered books
    return res.status(200).send(filteredBooks);
  }
});


// POST a new Book
app.post("/books", (req, res) => {
  const newBook = req.body;

  if (!hasRequiredFields(newBook)) {
    return res.status(400).json({ error: "Invalid or missing book fields" });
  };

  if (!hasRequiredFields) {
    return res.status(400).send({ error: "Missing required book fields" });
  }

  // Assign a new ID to the book
  newBook.id = books.length + 1;

  // Add the new book to the array
  books.push(newBook);

  // Return the newly created book
  return res.status(201).send(newBook);
});


// GET a Book by ID
app.get("/books/:id", (req, res) => {
  const book = books.find((elem) => elem.id === Number(req.params.id));

  if (!book) {
    return res.status(404).send({ error: "Book not found" });
  }

  return res.status(200).send(book);
});


// PUT (Update) a Book by ID
app.put("/books/:id", (req, res) => {
  const bookIndex = books.findIndex((elem) => {
    return elem.id === Number(req.params.id)
  });

  if (bookIndex === -1) {
    return res.status(404).send({ error: "Book not found" });
  }

  const updatedBook = req.body;

  // Validate the updated book data (basic validation)
  if (!hasRequiredFields(updatedBook)) {
    return res.status(400).send(
      { error: "Invalid or missing book fields" }
    );
  };

  // Update the book in the array
  books[bookIndex] = { id: books[bookIndex].id, ...updatedBook };

  // Return the updated book
  return res.status(200).send(books[bookIndex]);
});


// Delete a Book by ID
app.delete("/books/:id", (req, res) => {
  const bookIndex = books.findIndex((elem) => elem.id === Number(req.params.id));

  if (bookIndex === -1) {
    return res.status(404).send({ error: "Book not found" });
  }

  // Remove the book from the array
  const deletedBook = books.splice(bookIndex, 1);

  // Return the deleted book
  return res.status(200).send(deletedBook[0]);
});


// Starting the server
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running at http://${HOSTNAME}:${PORT}/`);
});
