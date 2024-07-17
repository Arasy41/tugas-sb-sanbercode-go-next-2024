import React, { useContext } from 'react';
import { BookContext } from './Component/BookContext';
import TableBooks from './Component/TableBooks';

const TablePage = () => {
  const { setCurrentPage } = useContext(BookContext);

  return (
    <div className="container-crud">
      <h1>Daftar Buku</h1>
      <button onClick={() => setCurrentPage('form')}>Tambah Buku</button>
      <TableBooks/>
    </div>
  );
};

export default TablePage;