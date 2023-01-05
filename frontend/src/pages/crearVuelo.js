import React, { useState } from "react";
import "./crearVuelo.css";
import axios from "axios";

const CrearVuelo = () => {
  const [nombreAgencia, setNombreAgencia] = useState("");
  const [ciudadOrigen, setCiudadOrigen] = useState("");
  const [ciudadDestino, setCiudadDestino] = useState("");
  const [diasVuelo, setDiasVuelo] = useState("");
  const [precioVuelo, setPrecioVuelo] = useState("");
  const [idUsuario, setIdUsuario] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !nombreAgencia ||
      !ciudadOrigen ||
      !ciudadDestino ||
      !diasVuelo ||
      !precioVuelo ||
      !idUsuario 
    ) {
      alert(
        "Uno de los campos de textos está vacío. Por favor llene todos los parámetros y vuelva a intentarlo."
      );
    } else {
      const formData = new FormData();
      formData.append("nombreAgencia", nombreAgencia);
      formData.append("ciudadOrigen", ciudadOrigen);
      formData.append("ciudadDestino", ciudadDestino);
      formData.append("diasVuelo", diasVuelo);
      formData.append("precioVuelo", precioVuelo);
      formData.append("idUsuario", idUsuario);
      // Obtenemos la ruta de la api correspondiente al login
      await axios.post(
        "http://52.203.83.171:3200/api/vuelos",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ).then(function (response) {
        console.log(response)
        alert(
          "Vuelo creado con éxito, comuníquese con un Recepcionista para que le aprueben su boleto. Regresando al menú principal."
        );
        window.location.href = "http://localhost:3000/menu";
      }).catch(function (error) {
        alert("Fallo al crear el vuelo/viaje. Consulte con el usuario administrador.")
        console.log(error)
      })
    }
  };

  return (
    <div className="all">
      <div className="App">
        <h2>Formulario de Registro de Vuelos/Viajes</h2>
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
            <label htmlFor="username">Ciudad de Origen</label>
            <input
              type="text"
              name="ciudadOrigen"
              placeholder="Ciudad de Origen"
              onChange={(e) => setCiudadOrigen(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Ciudad de Destino</label>
            <input
              type="text"
              name="ciudadDestino"
              placeholder="Ciudad de Destino"
              onChange={(e) => setCiudadDestino(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Día del Vuelo</label>
            <input
              type="text"
              name="diasVuelo"
              placeholder="Día del Vuelo"
              onChange={(e) => setDiasVuelo(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Precio del Vuelo</label>
            <input
              type="text"
              name="precioVuelo"
              placeholder="Precio del Vuelo"
              onChange={(e) => setPrecioVuelo(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">ID del Usuario a nombre del Vuelo</label>
            <input
              type="text"
              name="idUsuario"
              placeholder="ID del Usuario a nombre del Vuelo"
              onChange={(e) => setIdUsuario(e.target.value)}
            />
          </div>
          <button className="primary">Registrar Vuelo</button>
        </form>
      </div>
    </div>
  );
};

export default CrearVuelo;
