import { useState } from "react";
import sanberLogo from "../assets/logo.png";
import "./TugasIntro.css";
import TugasHooks from "../Tugas-Hooks/TugasHooks";

const CheckboxList = ({ items }) => {
  return (
    <div className="checkbox-list">
      {items.map((item, index) => (
        <div key={index} className="checkbox-item">
          <input
            type="checkbox"
            id={`checkbox-${index}`}
            className="checkbox-input"
          />
          <label htmlFor={`checkbox-${index}`}>
            {item}
            <hr></hr>
          </label>
        </div>
      ))}
    </div>
  );
};

function IntroReactJS() {
  const [bgColor, setBgColor] = useState(`#37B7C3`);

  const buttonOnClick = () => {
    setBgColor("red");
    setTimeout(() => {
      setBgColor("#37B7C3");
    }, 50);
  };

  const ToDoList = [
    "Belajar GIT & CLI",
    "Belajar HTML & CSS",
    "Belajar Javascript",
    "Belajar ReactJS Dasar",
    "Belajar ReactJS Advance",
  ];

  return (
    <>
      <div className="container">
        <TugasHooks />
        <div>
          <a href="https://sanbercode.com/" target="_blank">
            <img src={sanberLogo} className="logo" alt="Sanbercode logo" />
          </a>
        </div>
        <div className="card">
          <h1>THINGS TO DO</h1>
          <p>During bootcamp in sanbercode</p>
          <hr />
          <CheckboxList items={ToDoList} />
          <button
            style={{ backgroundColor: bgColor }}
            className="btn"
            onClick={buttonOnClick}
          >
            SEND
          </button>
        </div>
      </div>
    </>
  );
}

export default IntroReactJS;
