import React from "react";

const BookDetails = ({ book, onSubjectClick }) => {
  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      {book.formats["image/jpeg"] && (
        <img
          src={book.formats["image/jpeg"]}
          alt={book.title}
          className="book-cover"
        />
      )}
      <p>
        <strong>Authors:</strong>{" "}
        {book.authors.map((author) => author.name).join(", ")}
      </p>
      <p>
        <strong>Subjects:</strong>{" "}
        {book.subjects.map((subject, index) => (
          <span
            key={index}
            className="subject-tag"
            onClick={() => onSubjectClick(subject)}>
            {subject}
          </span>
        ))}
      </p>
      <p>
        <strong>Language:</strong> {book.languages.join(", ")}
      </p>
    </div>
  );
};

export default BookDetails;
