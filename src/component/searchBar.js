import React, { useRef } from "react";

const SearchBar = () => {
  const searchInputRef = useRef(null); // Create a ref for the input field

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Access the current value of the input field using the ref
    const inputValue = searchInputRef.current.value;

    // Now you can use inputValue for your logic (e.g., perform a search)
    console.log("Submitted value:", inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // When Enter key is pressed
      e.preventDefault(); // Prevent the default form submission behavior
      handleSubmit(e); // Call your submit function
    }
  };

  return (
    <>
      <div className="search-bar-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="search-input">
            <input
              ref={searchInputRef} // Attach the ref to the input field
              onKeyPress={handleKeyPress} // Call handleKeyPress when a key is pressed
              placeholder="Enter Colour Code"
            />
            <p>Write Code in HEX or RGB</p>
          </div>
          <button type="submit">Search</button>{" "}
        </form>
      </div>
    </>
  );
};

export default SearchBar;
