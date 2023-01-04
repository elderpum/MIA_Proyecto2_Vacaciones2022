import React, { useState } from "react";
import axios from "axios";
import "./eliminarAuto.css"

const EliminarAuto = () => {
  const [idAuto, setIdAuto] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idAuto) {
      alert(
        "El campo de texto está vacío. Por favor ingrese el ID y vuelva a intentarlo."
      );
    } else {

      await axios
        .delete("http://localhost:3200/api/autos", {
          data: {
            idAuto: idAuto
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response);
          alert(
            "Auto eliminado con éxito. Regresando al menú principal."
          );
          window.location.href = "http://localhost:3000/menu";
        })
        .catch(function (error) {
          alert(
            "Fallo al eliminar el auto. Consulte nuevamente sus credenciales y vuelva a intentarlo."
          );
          console.log(error);
        });
    }
  };

  return (
    <div className="all">
      <div className="App">
        <h2>Formulario para Eliminar Automóviles</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="idUsuario">Id del Auto</label>
            <input
              type="text"
              name="idAuto"
              placeholder="Id del Auto"
              onChange={(e) => setIdAuto(e.target.value)}
            />
          </div>
          <button className="primary">Eliminar Auto</button>
        </form>
      </div>
    </div>
  );
};

export default EliminarAuto;