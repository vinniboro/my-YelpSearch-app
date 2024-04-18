// App.tsx
import './index';
import React, { useState } from 'react';
import HomePage from './container/HomePage';
import SearchBar from './components/SearchBar';
import getBusinesses  from "./utils/yelpAPI"; // Import the searchBusinesses function

function App() {
  const [businesses, setBusinesses] = useState<any[]>([]); // State to hold businesses

  // Function to handle search and update businesses state
  const handleSearch = async (restaurant: string, location: string, sortBy: string) => {
    try {
      // Call the searchBusinesses function with the search terms and location
      const businesses = await getBusinesses(restaurant, location, sortBy);
      setBusinesses(businesses); // Update businesses state with returned businesses
    } catch (error) {
      console.error("Error searching businesses:", error); // Handle any errors that occur during the search
    }
  };

  return (
    <div className="App">
      {/* Pass handleSearch function and businesses state down to SearchBar */}
      <SearchBar handleSearch={handleSearch} />
      {/* Pass businesses state down to HomePage */}
      <HomePage businesses={businesses} />
    </div>
  );
}

export default App;
