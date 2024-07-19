import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../TugasContext/TugasContext.css';

const Table = () => {
  const [books, setBooks] = useState([]);
  const API_URL = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/books`);
      setBooks(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="container-crud-route">
      <h1>Daftar Buku</h1>
      <table className='table-route'>
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
                <Link to={`/tugas-router/form/${book.id}`} className="btn-edit-route">Edit</Link>
                <button className="btn-delete-route" onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/tugas-router/form" className="btn-add-route">Tambah Buku +</Link>
    </div>
  );
};

export default Table;
