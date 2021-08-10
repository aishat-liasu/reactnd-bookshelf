import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Book from "./Book";

function SearchPage({ books, updateBookShelf }) {
  const [query, updateQuery] = useState("");
  const [searchedBooks, updateSearchedBooks] = useState([]);

  //makes a fetch request everytime the query parameter has changed
  useEffect(() => {
    let trimmedQuery = query.trim();
    if (trimmedQuery.length > 0) {
      BooksAPI.search(trimmedQuery).then((books) => {
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
            ? searchedBooks.map((book) => {
                //checks to see if books from search request are available on the shelf
                let filteredBook = books
                  ? books.filter(
                      (bookfromShelf) => bookfromShelf.id === book.id
                    )
                  : [];

                return (
                  <Book
                    book={filteredBook.length > 0 ? filteredBook[0] : book}
                    key={filteredBook.length > 0 ? filteredBook[0].id : book.id}
                    updateBookShelf={updateBookShelf}
                  />
                );
              })
            : null}
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;
