import React, { createContext, useState, useEffect } from 'react';
import api from '../service/api';

export const ReviewContext = createContext();

const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get('/api/reviews').then(response => setReviews(response.data));
  }, []);

  return (
    <ReviewContext.Provider value={{ reviews, setReviews }}>
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewProvider;
