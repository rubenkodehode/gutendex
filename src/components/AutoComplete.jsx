import React, { useState } from "react";

const AutoComplete = ({ setResults, setLoading, setSelectedBook }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = async () => {
    if (searchText.trim().length === 0) return; // Skip empty searches
    setLoading(true);
    setSelectedBook(null); // Clear selected book on new search
    try {
      const response = await fetch(
        `https://gutendex.com/books?search=${encodeURIComponent(searchText)}`
      );
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <input
      type="text"
      placeholder="Search for books"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default AutoComplete;
