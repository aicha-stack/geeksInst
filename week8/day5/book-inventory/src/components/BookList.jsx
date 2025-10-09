import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectBooks,
  selectFantasyBooks,
  selectHorrorBooks,
  selectScienceFictionBooks
} from '../features/books/bookSelectors';

const BookList = () => {
  const [genre, setGenre] = useState('All');

  const allBooks = useSelector(selectBooks);
  const horrorBooks = useSelector(selectHorrorBooks);
  const fantasyBooks = useSelector(selectFantasyBooks);
  const sciFiBooks = useSelector(selectScienceFictionBooks);

  let displayedBooks = allBooks;
  if (genre === 'Horror') displayedBooks = horrorBooks;
  else if (genre === 'Fantasy') displayedBooks = fantasyBooks;
  else if (genre === 'Science Fiction') displayedBooks = sciFiBooks;

  return (
    <div>
      <h2>📚 Book Inventory</h2>
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="All">All</option>
        <option value="Horror">Horror</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Science Fiction">Science Fiction</option>
      </select>

      <ul>
        {displayedBooks.map(book => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author} ({book.genre})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
