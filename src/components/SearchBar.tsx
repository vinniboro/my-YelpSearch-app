import React, { useState, useEffect } from "react";


interface SearchBarProps {
  handleSearch: (restaurant: string, location: string, sortBy: string) => Promise<void>;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  // State variables to manage selected sorting option
  const [selectedOption, setSelectedOption] = useState<string>("best_match");
    // State variables to hold the values of search terms
    const [restaurant, setRestaurant] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [searchState, setSearchState] = useState<boolean>(false);

    
  // Function to handle radio button change
  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    handleSearchButtonClick();
  };

    // Event handler for restaurant input change
    const handleRestaurantChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRestaurant(event.target.value);
      };
    
      // Event handler for location input change
      const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
      };

      const handleSearchButtonClick = () => {
        handleSearch(restaurant, location, selectedOption);
      };

        // Function to handle location update from geolocation API
      const handleLocationUpdate = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude},${longitude}`); // You can format the location string as needed
      };



  // Get user location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleLocationUpdate);
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  }, []); // Empty dependency array to run only once on mount


  // Handle Enter key press in both restaurant and location input fields
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchButtonClick();
      setSearchState(true);
    }
  };

  return (
    
<>      

          {searchState ? (
            <div className="search-bar">
            <div style={{ paddingBottom: '0' }} className="column-contain">
            <div className="row-contain">
              {/* Radio buttons for sorting options */}
              <div className={searchState ? '' : 'no-text-input'}>
                {/* Input fields for restaurant and location */}
                <input
                  type="text"
                  placeholder="Search by restaurant..."
                  value={restaurant}
                  onChange={handleRestaurantChange}
                  onKeyPress={handleKeyPress} // Add onKeyPress handler
                />
              </div>
              <div>
                <input
                  type="button"
                  id="bestMatch"
                  name="sortingOption"
                  value="Best match"
                  onClick={() => handleOptionChange("best_match")}
                  className={selectedOption === "best_match" ? 'activeSort' : ''}
                />
              </div>
              <div>
                <input
                  type="button"
                  id="highestRating"
                  name="sortingOption"
                  value="Rating"
                  onClick={() => handleOptionChange("rating")}
                  className={selectedOption === "rating" ? 'activeSort' : ''}
                />
              </div>
              <div>
                <input
                  type="button"
                  id="mostReviewed"
                  name="sortingOption"
                  value="Review count"
                  onClick={() => handleOptionChange("review_count")}
                  className={selectedOption === "review_count" ? 'activeSort' : ''}
                />
              </div>
            </div>
            </div>
      </div>
          ) : (
            <div className={searchState ? 'no-text-input' : 'PreSearch-text-input'}>
              {/* Input fields for restaurant and location */}
              <input
                type="text"
                placeholder="Search by restaurant..."
                value={restaurant}
                onChange={handleRestaurantChange}
                onKeyPress={handleKeyPress} // Add onKeyPress handler
              />
            </div>
          )}


      </>



  );
};

export default SearchBar;
