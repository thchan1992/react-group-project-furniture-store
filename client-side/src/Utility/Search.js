import React from "react";
import FormControl from "react-bootstrap/FormControl";

const Search = ({ setKeyword, keyword }) => {
  return (
    <FormControl
      type="text"
      placeholder="search product name1"
      className="mr-sm-2"
      value={keyword}
      name="keyword"
      onChange={(e) => {
        setKeyword(e.target.value);
      }}
    />
  );
};
export default Search;
