import React, { useState } from "react";

// ===================== Step 1: Define Book Type =====================
type Book = {
  id: number;
  title: string;
  author: string;
};

// ===================== Step 2: Generic List Component =====================
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// ===================== Step 3: Main BookApp Component =====================
const BookApp: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: "1984", author: "George Orwell" },
    { id: 2, title: "Brave New World", author: "Aldous Huxley" },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const addBook = () => {
    if (!newTitle || !newAuthor) return;

    const newBook: Book = {
      id: Date.now(),
      title: newTitle,
      author: newAuthor,
    };

    setBooks((prev) => [...prev, newBook]);
    setNewTitle("");
    setNewAuthor("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Book List</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ marginRight: "5px" }}
        />
        <input
          type="text"
          placeholder="Author"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          style={{ marginRight: "5px" }}
        />
        <button onClick={addBook}>Add Book</button>
      </div>

      <List
        items={books}
        renderItem={(book) => (
          <div>
            <strong>{book.title}</strong> by {book.author}
          </div>
        )}
      />
    </div>
  );
};

export default BookApp;
