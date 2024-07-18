import React, { useContext } from 'react';
import { BookContext } from './Component/BookContext';
import FormBook from  './Component/FormBooks'
import './TugasContext.css'

const FormPage = () => {
  const { setCurrentPage } = useContext(BookContext);

  return (
    <><FormBook /></>
  );
};

export default FormPage;
