import React, { useState } from "react";
import axios from "axios";
import "./eliminarVuelo.css"

const EliminarVuelo = () => {
  const [idVuelo, setIdVuelo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idVuelo) {
      alert(
        "El campo de texto está vacío. Por favor ingrese el ID y vuelva a intentarlo."
      );
    } else {

      await axios
        .delete("http://3.94.79.239:3200/api/vuelos", {
          data: {
            idVuelo: idVuelo
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response);
          alert(
            "Vuelo eliminado con éxito. Regresando al menú principal."
          );
          window.location.href = "http://localhost:3000/menu";
        })
        .catch(function (error) {
          alert(
            "Fallo al eliminar el vuelo. Consulte nuevamente sus credenciales y vuelva a intentarlo."
          );
          console.log(error);
        });
    }
  };

  return (
    <div className="all">
      <div className="App">
        <h2>Formulario para Eliminar Vuelos</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="idUsuario">Id del Vuelo</label>
            <input
              type="text"
              name="idVuelo"
              placeholder="Id del Vuelo"
              onChange={(e) => setIdVuelo(e.target.value)}
            />
          </div>
          <button className="primary">Eliminar Vuelo</button>
        </form>
      </div>
    </div>
  );
};

export default EliminarVuelo;