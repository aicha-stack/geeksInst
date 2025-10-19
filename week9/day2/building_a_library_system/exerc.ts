

interface Book {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre?: string;
}

class Library {
  private books: Book[] = [];

  public addBook(book: Book): void {
    this.books.push(book);
  }

  public getBookDetails(isbn: string): string {
    const book = this.books.find(b => b.isbn === isbn);
    return book
      ? `Title: ${book.title}, Author: ${book.author}, Year: ${book.publishedYear}, Genre: ${book.genre ?? "N/A"}`
      : "Book not found.";
  }

  protected getAllBooks(): Book[] {
    return this.books;
  }
}

class DigitalLibrary extends Library {
  readonly website: string;

  constructor(website: string) {
    super();
    this.website = website;
  }

  public listBooks(): string[] {
    return this.getAllBooks().map(book => book.title);
  }
}

const myLibrary = new DigitalLibrary("https://mylibrary.com");

myLibrary.addBook({
  title: "Clean Code",
  author: "Robert C. Martin",
  isbn: "9780132350884",
  publishedYear: 2008,
  genre: "Programming"
});

myLibrary.addBook({
  title: "Atomic Habits",
  author: "James Clear",
  isbn: "9780735211292",
  publishedYear: 2018
});

console.log(myLibrary.getBookDetails("9780132350884"));
console.log(myLibrary.getBookDetails("9780735211292"));
console.log("All Books:", myLibrary.listBooks());
console.log("Library Website:", myLibrary.website);
