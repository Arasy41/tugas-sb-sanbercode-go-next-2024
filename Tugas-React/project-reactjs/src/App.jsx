import React from 'react';
import IntroReactJS from './Tugas-Intro-ReactJS/TugasIntroReact';
import TugasAxios from './TugasAxios/TugasAxios';
import TugasCRUDHooks from "./TugasCRUDHooks/TugasCRUDHooks";
import { BookProvider } from './TugasContext/Component/BookContext';
import TablePage from './TugasContext/TablePage';
import FormPage from './TugasContext/FormPage';
import { ThemeProvider } from './TugasRouter/context/ThemeContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './TugasRouter/Navbar';
import './TugasRouter/Navbar.css';

const MainContent = () => {
  return (
    <BookProvider>
      <Routes>
        <Route path="/" element={<TablePage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </BookProvider>
  );
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
          <Route path="/tugas-context" element={<MainContent />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
