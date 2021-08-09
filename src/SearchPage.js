import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Book from "./Book";

function SearchPage(updateChangeShelf) {
  const [query, updateQuery] = useState("");
  const [searchedBooks, updateSearchedBooks] = useState([]);

  useEffect(() => {
    let trimmedQuery = query.trim();
    if (trimmedQuery.length > 0) {
      BooksAPI.search(trimmedQuery).then((books) => {
        console.log(books);
        if (books.error !== "empty query") {
          updateSearchedBooks(books);
        } else {
          updateSearchedBooks([]);
        }
      });
    } else {
      updateSearchedBooks([]);
    }
  }, [query]);

  console.log(query);
  console.log(searchedBooks);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchedBooks
            ? searchedBooks.map((book) => (
                <Book
                  book={book}
                  key={book.id}
                  updateShelf={updateChangeShelf}
                />
              ))
            : null}
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;
