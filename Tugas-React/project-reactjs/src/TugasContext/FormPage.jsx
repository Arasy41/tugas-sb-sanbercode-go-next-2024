import React, { useContext } from 'react';
import { BookContext } from './Component/BookContext';
import FormBook from  './Component/FormBooks'

const FormPage = () => {
  const { setCurrentPage } = useContext(BookContext);

  return (
    <div className="container-form">
      <h2>Form Buku</h2>
      <button onClick={() => setCurrentPage('table')}>Kembali ke Daftar Buku</button>
      <FormBook />
    </div>
  );
};

export default FormPage;
