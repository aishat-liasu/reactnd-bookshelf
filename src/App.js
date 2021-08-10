import React, { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Book from "./Book";
import SearchPage from "./SearchPage";

function App() {
  const [books, updateBooks] = useState([]);

  //makes a fetch request to update the books array everytime the page is reloaded
  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      updateBooks(books);
    });
  }, []);

  const updateBookShelf = (book, selectedShelf) => {
    BooksAPI.update(book, selectedShelf).then(() => {
      book.shelf = selectedShelf;
      // Filters out the book and appends it to the end of the list

      let booksPlusChangedBook = books
        .filter((b) => b.id !== book.id)
        .concat([book]);
      console.log(booksPlusChangedBook);
      //updates the books array with the book that has a changed shelf
      updateBooks([...booksPlusChangedBook]);
    });
  };

  return (
    <div className="app">
      <Route
        exact
        path="/search"
        render={() => (
          <SearchPage books={books} updateBookShelf={updateBookShelf} />
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
                      {/* filters through the list of books for shelf "currentlyReading" */}
                      {books
                        ? books.map((book) =>
                            book.shelf === "currentlyReading" ? (
                              <Book
                                book={book}
                                key={book.id}
                                updateBookShelf={updateBookShelf}
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
                      {/* filters through the list of books for shelf "wantToRead" */}
                      {books
                        ? books.map((book) =>
                            book.shelf === "wantToRead" ? (
                              <Book
                                book={book}
                                key={book.id}
                                updateBookShelf={updateBookShelf}
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
                      {/* filters through the list of books for shelf "read" */}
                      {books
                        ? books.map((book) =>
                            book.shelf === "read" ? (
                              <Book
                                book={book}
                                key={book.id}
                                updateBookShelf={updateBookShelf}
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
