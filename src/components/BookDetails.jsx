const BookDetails = ({ book, onSetSubjectFilter }) => {
  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <img
        src={book.formats["image/jpeg"] || "placeholder.jpg"}
        alt={book.title}
        className="book-cover"
      />
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
            onClick={() => {
              console.log("Setting subject filter:", subject); // Debug
              onSetSubjectFilter(subject);
            }}>
            {subject}
          </span>
        ))}
      </p>
    </div>
  );
};

export default BookDetails;
