import React, { useState } from "react";
import axios from "axios";
import "./eliminarUsuario.css"

const EliminarUsuario = () => {
  const [idUsuario, setIdUsuario] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idUsuario) {
      alert(
        "El campo de texto está vacío. Por favor ingrese el ID y vuelva a intentarlo."
      );
    } else {

      await axios
        .delete("http://localhost:3200/api/users", {
          data: {
            idUsuario: idUsuario
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response);
          alert(
            "Usuario eliminado con éxito. Regresando al menú principal."
          );
          window.location.href = "http://localhost:3000/menu";
        })
        .catch(function (error) {
          alert(
            "Fallo al eliminar el usuario. Consulte nuevamente sus credenciales y vuelva a intentarlo."
          );
          console.log(error);
        });
    }
  };

  return (
    <div className="all">
      <div className="App">
        <h2>Formulario para Eliminar Usuarios</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="idUsuario">Id del Usuario</label>
            <input
              type="text"
              name="idUsuario"
              placeholder="Id del Usuario"
              onChange={(e) => setIdUsuario(e.target.value)}
            />
          </div>
          <button className="primary">Eliminar Usuario</button>
        </form>
      </div>
    </div>
  );
};

export default EliminarUsuario;