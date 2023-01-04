import React from "react";
import "./Button.css";

const Button = () => {

  const handleSubmit = async (e) => {
    e.preventDefault()
    alert("Cerrando sesión. Gracias por preferirnos.")
    window.location.href = "http://localhost:3000/";
  }

  return (
    <form onSubmit={handleSubmit}>
      <button className="btn">Log Out</button>
    </form>
  );
}

export default Button;