import React from "react";

const SearchResults = ({ results, onSelectBook }) => {
  const handleBookClick = (book) => {
    onSelectBook(book);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="search-results">
      {results.map((book) => (
        <div
          className="card"
          key={book.id}
          onClick={() => handleBookClick(book)}>
          <img
            src={book.formats["image/jpeg"] || "placeholder-image-url"}
            alt={book.title}
            className="book-cover"
          />
          <h3 title={book.title}>{book.title}</h3>
          <p>{book.authors.map((author) => author.name).join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
