import React from "react";

const languageMap = {
  en: "English",
  fr: "French",
  de: "German",
  es: "Spanish",
  it: "Italian",
  pt: "Portuguese",
  nl: "Dutch",
  ru: "Russian",
  zh: "Chinese",
  ja: "Japanese",
  ar: "Arabic",
  hi: "Hindi",
  sv: "Swedish",
  no: "Norwegian",
  da: "Danish",
  fi: "Finnish",
};

const BookDetails = ({ book, onSubjectClick }) => {
  const readableLanguages = book.languages
    .map((code) => languageMap[code] || code)
    .join(", ");
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
        <strong>Language:</strong> {readableLanguages}
      </p>
    </div>
  );
};

export default BookDetails;
