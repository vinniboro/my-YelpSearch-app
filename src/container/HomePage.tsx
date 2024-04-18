// HomePage.tsx

import React from "react";
import BusinessList from "../components/BusinessList";

interface HomePageProps {
  businesses: any[]; // Define the type of the businesses prop
}

const HomePage: React.FC<HomePageProps> = ({ businesses }) => {
  return (
    <div className="home">
      {/* Render the BusinessList component and pass businessData as a property */}
      <BusinessList businesses={businesses} />
    </div>
  );
};

export default HomePage;
