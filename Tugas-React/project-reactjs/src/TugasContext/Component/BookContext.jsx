import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BookContext = createContext();

export const BookProvider = props => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    release_year: "",
    price: "",
    total_page: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState('table');
  const API_URL = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/books`);
      console.log('API Response:', response.data);
      setBooks(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <BookContext.Provider value={{ books, setBooks, formData, setFormData, editIndex, setEditIndex, fetchBooks, currentPage, setCurrentPage }}>
      {props.children}
    </BookContext.Provider>
  );
};
