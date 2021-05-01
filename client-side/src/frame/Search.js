import React from "react";
import FormControl from "react-bootstrap/FormControl";
import "./Search.css";
const Search = ({ setKeyword, keyword }) => {
  return (
    <FormControl
      type="text"
      placeholder="Search Products"
      className="placeholder-style-search"
      value={keyword}
      name="keyword"
      onChange={(e) => {
        setKeyword(e.target.value);
      }}
    />
  );
};
export default Search;
