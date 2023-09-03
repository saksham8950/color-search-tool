import react, { useEffect, useState, useRef } from "react";
import "./style.scss";
import ColourList from "./component/colourList";
import colorDifference from "color-difference";
import convert from "color-convert";
import SearchIcon from "./search.png";

function App() {
  const [colors, setColors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchedColor, setSearchedColor] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/NishantChandla/color-test-resources/main/xkcd-colors.json"
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setColors(data.colors);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Colors:", error);
      setIsLoading(false);
    }
  };

  const isValidCSSColor = (colorString) => {
    const div = document.createElement("div");
    div.style.color = colorString;
    return div.style.color !== "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = searchInputRef.current.value;
    const isValidColor = isValidCSSColor(inputValue);

    if (isValidColor) {
      setSearchedColor(inputValue);
      searchColors(inputValue);
    } else {
      alert("Invalid CSS color input.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const searchColors = (targetColor) => {
    const targetColorHex = targetColor.startsWith("#")
      ? targetColor
      : convert.rgb.hex(targetColor);

    // Sort colors by similarity to the target color
    const sortedColors = [...colors].sort((a, b) => {
      const differenceA = colorDifference.compare(
        targetColorHex,
        a.hex.substring(1)
      );
      const differenceB = colorDifference.compare(
        targetColorHex,
        b.hex.substring(1)
      );
      return differenceA - differenceB;
    });

    // Display the top ~100 results
    setSearchResults(sortedColors.slice(0, 100));
  };
  const handleRetry = () => {
    setIsLoading(true);
    fetchData();
  };

  return (
    <>
      <div className="main">
        <h1>Colour Search Tool</h1>
        <>
          {/* Search Bar */}
          <div className="search-bar-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="search-bar">
                <input
                  ref={searchInputRef}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter Colour Code"
                />
                <p>or</p>
                <input
                  ref={searchInputRef}
                  onKeyPress={handleKeyPress}
                  type="color"
                />
                <button type="submit">
                  <img src={SearchIcon} alt="Search Icon" />
                </button>
              </div>
              <p>HEX or RGB</p>
            </form>
          </div>
        </>

        {isLoading ? (
          <h2 className="loader">Loading...</h2>
        ) : (
          <>
            {colors.length === 0 ? (
              <div className="retry-button">
                <button onClick={handleRetry}>Retry</button>
              </div>
            ) : (
              <>
                {searchedColor ? (
                  <h2>Searched Color: {searchedColor}</h2>
                ) : (
                  <h2>All Colours</h2>
                )}
                <ColourList colours={searchedColor ? searchResults : colors} />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
