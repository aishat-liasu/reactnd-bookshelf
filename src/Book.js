import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

const Book = ({ book, updateShelf }) => {
  const updateBookShelf = (book, selectedShelf) => {
    BooksAPI.update(book, selectedShelf);
    updateShelf(true);
  };

  //returns a book component only if "book.imageLinks" exists
  return book.imageLinks ? (
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})`,
            }}
          />

          <div className="book-shelf-changer">
            <select
              value={book.shelf}
              onChange={(e) => updateBookShelf(book, e.target.value)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>

        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? book.authors.join(", ") : null}
        </div>
      </div>
    </li>
  ) : null;
};

export default Book;
