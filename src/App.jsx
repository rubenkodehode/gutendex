import React, { useState, useEffect } from "react";
import Autocomplete from "./components/Autocomplete";
import SearchResults from "./components/SearchResults";
import BookDetails from "./components/BookDetails";
import "./App.css";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authorFilter, setAuthorFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");

  useEffect(() => {
    if (!searchText && !subjectFilter) {
      setResults([]);
      setLoading(false);
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      try {
        let query = searchText || subjectFilter;
        let url = `https://gutendex.com/books?search=${query}`;

        if (languageFilter) {
          url += `&languages=${languageFilter}`;
        }

        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error("Failed to fetch books");

        const data = await response.json();

        let filteredResults = data.results;

        if (authorFilter) {
          filteredResults = filteredResults.filter((book) =>
            book.authors.some((author) =>
              author.name.toLowerCase().includes(authorFilter.toLowerCase())
            )
          );
        }

        setResults(filteredResults);
      } catch (err) {
        if (err.name === "AbortError") {
          setError("Request timed out. Please try again later.");
        } else {
          setError(err.message);
        }
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchBooks, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchText, authorFilter, languageFilter, subjectFilter]);

  const handleSubjectClick = (subject) => {
    setSubjectFilter(subject);
    setSearchText(subject);
  };

  return (
    <div className={`App ${loading ? "loading" : ""}`}>
      <h1>GutenDex</h1>
      <h3>A Book Search Index</h3>
      <Autocomplete searchText={searchText} setSearchText={setSearchText} />
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by author"
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by subject"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
        />
        <select
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}>
          <option value="">All Languages</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="es">Español</option>
          <option value="it">Italiano</option>
          <option value="pt">Português</option>
          <option value="nl">Nederlands</option>
          <option value="ru">Русский</option>
          <option value="zh">中文</option>
          <option value="ja">日本語</option>
          <option value="ar">عربي</option>
          <option value="hi">हिन्दी</option>
          <option value="sv">Svenska</option>
          <option value="no">Norsk</option>
          <option value="da">Dansk</option>
          <option value="fi">Suomi</option>
        </select>
      </div>
      {loading && <div className="spinner"></div>}
      {error && <p className="error">{error}</p>}
      {selectedBook && (
        <BookDetails book={selectedBook} onSubjectClick={handleSubjectClick} />
      )}
      <SearchResults
        results={results}
        onSelectBook={setSelectedBook}
        displayAsCards={true}
      />
    </div>
  );
};

export default App;
