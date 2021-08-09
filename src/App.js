import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

import { Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Book from "./Book";
import SearchPage from "./SearchPage";

function App() {
  const [books, updateBooks] = useState([]);
  //const [searchedBooks, updateSearchedBooks] = useState([]);
  const [changeShelf, updateChangeShelf] = useState(false);
  //const [query, updateQuery] = useState("");

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      //console.log(books);
      updateBooks(books);
    });
    updateChangeShelf(false);
  }, [changeShelf]);

  return (
    <div className="app">
      <Route
        exact
        path="/search"
        render={() => (
          <SearchPage books={books} updateChangeShelf={updateChangeShelf} />
        )}
      />
      <Route
        exact
        path="/"
        render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books
                        ? books.map((book) =>
                            book.shelf === "currentlyReading" ? (
                              <Book
                                book={book}
                                key={book.id}
                                updateShelf={updateChangeShelf}
                              />
                            ) : null
                          )
                        : null}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books
                        ? books.map((book) =>
                            book.shelf === "wantToRead" ? (
                              <Book
                                book={book}
                                key={book.id}
                                updateShelf={updateChangeShelf}
                              />
                            ) : null
                          )
                        : null}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books
                        ? books.map((book) =>
                            book.shelf === "read" ? (
                              <Book
                                book={book}
                                key={book.id}
                                updateShelf={updateChangeShelf}
                              />
                            ) : null
                          )
                        : null}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search" className="search-link">
                Add a book
              </Link>
            </div>
          </div>
        )}
      />
    </div>
  );
}

export default App;
