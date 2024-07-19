import React, { useContext } from 'react';
import IntroReactJS from './Tugas-Intro-ReactJS/TugasIntroReact';
import TugasAxios from './TugasAxios/TugasAxios';
import TugasCRUDHooks from "./TugasCRUDHooks/TugasCRUDHooks";
import { BookContext, BookProvider } from './TugasContext/Component/BookContext';
import TablePage from './TugasContext/TablePage';
import FormPage from './TugasContext/FormPage';
import { ThemeProvider } from './TugasRouter/context/ThemeContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './TugasRouter/Navbar';
import './TugasRouter/Navbar.css';
import TugasRouter from './TugasRouter/Index';
import Form from './TugasRouter/Form';

const MainContent = () => {
  const { currentPage } = useContext(BookContext);

  return currentPage === 'table' ? <TablePage /> : <FormPage />;
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<IntroReactJS />} />
          <Route path="/tugas-axios" element={<TugasAxios />} />
          <Route path="/tugas-crud-hooks" element={<TugasCRUDHooks />} />
          <Route path="/tugas-context" element={
            <BookProvider>
              <MainContent />
            </BookProvider>
          } />
          <Route path='/tugas-router' element={<TugasRouter />} />
          <Route path="/tugas-router/form" element={<Form />} />
          <Route path="/tugas-router/form/:id" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
