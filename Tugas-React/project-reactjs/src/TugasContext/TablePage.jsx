import React, { useContext } from "react";
import { BookContext } from "./Component/BookContext";
import TableBooks from "./Component/TableBooks";
import './TugasContext.css'

const TablePage = () => {
  const { setCurrentPage } = useContext(BookContext);

  return (
    <div className="container-crud">
      <h1>Daftar Buku</h1>
      <TableBooks/>
      <button className='btn-add' onClick={() => setCurrentPage('form')}>Tambah Buku +</button>
    </div>
  );
};

export default TablePage;