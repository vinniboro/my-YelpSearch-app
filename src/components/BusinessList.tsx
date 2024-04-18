// BusinessList.tsx
import { useInfiniteScroll } from "../utils/infinitScroll";
import React, {useEffect} from "react";
import Business, { BusinessProps } from "../components/Business"; // Import Business component and BusinessProps interface

interface BusinessListProps {
  businesses: BusinessProps[]; // Define props interface with an array of Business objects
}

const BusinessList: React.FC<BusinessListProps> = ({ businesses }) => {
  /*
  const isBottom = useInfiniteScroll();

  useEffect(() => {
    if (isBottom) {
      // Handle infinite scroll behavior here if needed
    }
  }, [isBottom]);
*/
  return (
    <div className="contain-businesses">
      {/* Map over the businesses array and render a Business component for each business */}
      {businesses.map((business, index) => (
        <Business key={index} {...business} />
      ))}
    </div>
  );
};

export default BusinessList;
