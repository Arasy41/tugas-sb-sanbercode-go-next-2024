import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Table from './Table';
import Form from './Form';

const TugasRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/form" element={<Form />} />
        <Route path="/form/:id" element={<Form />} />
      </Routes>
    </>
  );
};

export default TugasRouter;
