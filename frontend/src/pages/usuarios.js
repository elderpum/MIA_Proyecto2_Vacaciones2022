import React from "react";
import "./usuarios.css";
import axios from "axios";

const Usuarios = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h2>Tabla de Usuarios Totales</h2>
      <form className="form" onSubmit={handleSubmit}>
        <button className="primary">Registrar Cuenta</button>
      </form>
    </>
  );
};

export default Usuarios;
