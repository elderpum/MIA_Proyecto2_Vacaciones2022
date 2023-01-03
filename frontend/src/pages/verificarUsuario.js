import React, { useState } from "react";
import axios from "axios";
import "./verificarUsuario.css"

const VerificarUsuario = () => {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !code) {
      alert(
        "Uno de los campos de texto está vacío. Por favor llene todos los parámetros y vuelva a intentarlo."
      );
    } else {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("code", code);

      const res = await axios
        .put("http://localhost:3200/api/users/confirm", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response);
          alert(
            "Usuario verificado con éxito. Consulte con el administrador para confirmar esta información en Cognito. Regresando al menú principal."
          );
          window.location.href = "http://localhost:3000/menu";
        })
        .catch(function (error) {
          alert(
            "Fallo al verificar el usuario. Consulte nuevamente sus credenciales y vuelva a intentarlo."
          );
          console.log(error);
        });
    }
  };

  return (
    <div className="all">
      <div className="App">
        <h2>Formulario para Confirmar Usuarios en Cognito</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              name="username"
              placeholder="Nombre de Usuario"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="username">Código de Verificación de Cognito</label>
            <input
              type="text"
              name="code"
              placeholder="123456"
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button className="primary">Verificar Cuenta</button>
        </form>
      </div>
    </div>
  );
};

export default VerificarUsuario;
