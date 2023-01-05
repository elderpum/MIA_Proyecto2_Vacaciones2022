import React, { useState } from "react";
import "./crearAuto.css";
import axios from "axios";

const CrearAuto = () => {
  const [nombreAgencia, setNombreAgencia] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [precioAuto, setPrecioAuto] = useState("");
  const [ciudadOrigen, setCiudadOrigen] = useState("");
  const [idUsuario, setIdUsuario] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombreAgencia || !marca || !modelo || !precioAuto || !idUsuario) {
      alert(
        "Uno de los campos de textos está vacío. Por favor llene todos los parámetros y vuelva a intentarlo."
      );
    } else {
      const formData = new FormData();
      formData.append("nombreAgencia", nombreAgencia);
      formData.append("marca", marca);
      formData.append("modelo", modelo);
      formData.append("precioAuto", precioAuto);
      formData.append("ciudadOrigen", ciudadOrigen)
      formData.append("idUsuario", idUsuario);
      // Obtenemos la ruta de la api correspondiente al login
      await axios
        .post("http://3.94.79.239:3200/api/autos", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response);
          alert(
            "Auto creado con éxito, comuníquese con un Recepcionista para que le aprueben su renta. Regresando al menú principal."
          );
          window.location.href = "http://localhost:3000/menu";
        })
        .catch(function (error) {
          alert(
            "Fallo al crear el automóvil. Consulte con el usuario administrador."
          );
          console.log(error);
        });
    }
  };

  return (
    <div className="all">
      <div className="App">
        <h2>Formulario de Registro de Automóviles</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nombre de la Agencia</label>
            <input
              type="text"
              name="nombreAgencia"
              placeholder="Nombre de la Agencia"
              onChange={(e) => setNombreAgencia(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="username">Marca del Automóvil</label>
            <input
              type="text"
              name="Marca del Automóvil"
              placeholder="marca"
              onChange={(e) => setMarca(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Modelo del Automóvil</label>
            <input
              type="text"
              name="modelo"
              placeholder="Modelo del Automóvil"
              onChange={(e) => setModelo(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Precio del Auto</label>
            <input
              type="text"
              name="precioAuto"
              placeholder="Precio del Auto"
              onChange={(e) => setPrecioAuto(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Ciudad de Origen</label>
            <input
              type="text"
              name="ciudadOrigen"
              placeholder="Ciudad de Origen"
              onChange={(e) => setCiudadOrigen(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">ID del Usuario a nombre de la Renta</label>
            <input
              type="text"
              name="idUsuario"
              placeholder="ID del Usuario a nombre de la Renta"
              onChange={(e) => setIdUsuario(e.target.value)}
            />
          </div>
          <button className="primary">Registrar Automóvil</button>
        </form>
      </div>
    </div>
  );
};

export default CrearAuto;
