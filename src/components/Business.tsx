import React from "react";



// Define the BusinessProps interface describing the structure of props passed to the Business component
export interface BusinessProps {
  imageUrl: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  categories: string[];
  rating: number;
  price: string;
  review_count: number;
  location: { address1: string }; // Update type to Location object
  url: string;
}

// Define the Business functional component using React.FC and specify the type of props it receives
const Business: React.FC<BusinessProps> = ({
  imageUrl,
  name,
  categories,
  rating,
  price,
  review_count,
  location,
  url
}) => {
  return (
    <a target="blank" href={url}>
    <div className="business">
        {/* Display business information */}
        <div
          className="business-image"
          style={{
            backgroundImage: `url(${imageUrl})`,

          }}
        />

        <div className="category-contain"> 

        {categories.map((category) => (
          
          <p className="category"><i>{category}</i></p>
          ))}
                      <p className="category" ><strong>{price}</strong></p>

        </div>


          <div className="info">
          <h4>{name}</h4>      
            <span>{location.address1}</span>
            <p>
              <strong>Rating:</strong> {rating} / 5
            </p>



        </div>
        </div>
        </a>
  );
};

export default Business; // Export the Business component as default
