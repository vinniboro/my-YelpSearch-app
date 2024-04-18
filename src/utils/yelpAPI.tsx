// yelp.service.ts

// Interface for Business object
interface Business {
  id: string;
  name: string;
  rating: number;
  imageUrl?: string; // Optional image URL
  categories?: string[]; // Optional list of categories
  // Add more business details as needed
  price: string;
  review_count: number;
  location: object;
  url: string;
}

// Function to retrieve business listings from Yelp API
async function getBusinesses(searchTerm: string, location: string, sortBy?: string): Promise<Business[]> {
  // Replace with your actual Yelp API key
  const apiKey = 'API_KEY';

  // Construct the Yelp API URL with parameters
  const url = new URL('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search');
  url.searchParams.append('term', searchTerm);
  url.searchParams.append('location', location);
  if (sortBy) {
    url.searchParams.append('sort_by', sortBy);
  }

  // Create headers with authorization
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${apiKey}`);

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Yelp API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Extract relevant business information and create Business objects
    const businesses: Business[] = [];
    for (const business of data.businesses) {
      businesses.push({
        id: business.id,
        name: business.name,
        rating: business.rating,
        imageUrl: business.image_url, // Optional
        categories: business.categories?.map((category:any) => category.title), // Optional
        price: business.price,
        review_count: business.review_count,
        location: business.location,
        url: business.url
        // Add more business details as needed
      });
    }

    return businesses;
  } catch (error) {
    console.error('Error fetching businesses:', error);
    throw error; // Re-throw for handling at the caller level
  }
}

export default getBusinesses;
