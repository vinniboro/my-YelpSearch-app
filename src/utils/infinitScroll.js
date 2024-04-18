// src/utils/infiniteScroll.js
import { useState, useEffect } from "react";

export const useInfiniteScroll = () => {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollBottom = scrollTop + windowHeight;

      if (scrollBottom >= documentHeight) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
        if (isBottom) {
          // Update the height of .contain-businesses
          const containBusinesses = document.querySelector(".contain-businesses");
          if (containBusinesses) {
            const currentHeight = containBusinesses.clientHeight;
            const newHeight = currentHeight + window.innerHeight * 3; // Adding 300vh
      
            containBusinesses.style.height = `${newHeight}px`;
          }
        } 
      
  }, [isBottom]);

  return isBottom;
};
