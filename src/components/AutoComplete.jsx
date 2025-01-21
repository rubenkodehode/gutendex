import React from "react";

const AutoComplete = ({ searchText, setSearchText, setLoading }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setLoading(true);
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
