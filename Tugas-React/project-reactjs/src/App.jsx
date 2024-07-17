import React, { useContext } from'react';
// import IntroReactJS from './Tugas-Intro-ReactJS/TugasIntroReact';
// import TugasHooks from './Tugas-Hooks/TugasHooks';
// import TugasCRUDHooks from "./TugasCRUDHooks/TugasCRUDHooks";
import { BookContext, BookProvider } from './TugasContext/Component/BookContext';
import TablePage from './TugasContext/TablePage';
import FormPage from './TugasContext/FormPage';
import './App.css';

const MainContent = () => {
  const { currentPage } = useContext(BookContext);

  return currentPage === 'table' ? <TablePage /> : <FormPage />;
};

function App() {
  return (
    <>
      {/* <TugasHooks/>
      <IntroReactJS/> 
      <TugasCRUDHooks/> */}
      <BookProvider>
        <MainContent />
      </BookProvider>
    </>
  );
}

export default App;