import React, { useContext } from 'react';
import axios from 'axios';
import { BookContext } from './BookContext';

const TableBooks = () => {
  const { books, setFormData, setEditIndex, fetchBooks, setCurrentPage } = useContext(BookContext);
  const API_URL = import.meta.env.VITE_BASE_API_URL;

  const handleEdit = (index) => {
    setFormData(books[index]);
    setEditIndex(index);
    setCurrentPage('form');
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`${API_URL}/books/${books[index].id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <table className='table-ctx'>
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Description</th>
          <th>Image</th>
          <th>Release Year</th>
          <th>Price</th>
          <th>Total Page</th>
          <th>Thickness</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{book.title}</td>
            <td>{book.description}</td>
            <td><img src={book.image_url} alt={book.title} width="50" /></td>
            <td>{book.release_year}</td>
            <td>{book.price}</td>
            <td>{book.total_page}</td>
            <td>{book.thickness}</td>
            <td>
              <button className="btn-edit-ctx" onClick={() => handleEdit(index)}>Edit</button>
              <button className="btn-delete-ctx" onClick={() => handleDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableBooks;
