import React, { useState } from "react";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarioAdmin = process.env.REACT_APP_USUARIO
    const passwordAdmin = process.env.REACT_APP_PASSWORD

    console.log(usuarioAdmin)
    console.log(passwordAdmin)

    if (!username || !password) {
      alert("Uno de los campos está vacío. Llénelo y vuelva a intentarlo");
    } else if (username === usuarioAdmin && password === passwordAdmin) {
      alert("Si lo reconoció xd")
    } else {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      await axios
        .post("http://localhost:3200/api/login", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response);
          alert("Usuario reconocido. Bienvenido");
          window.location.href = "http://localhost:3000/menu";
        })
        .catch(function (error) {
          alert(
            "Fallo al iniciar sesión. Compruebe sus credenciales y vuelva a intentarlo."
          );
          console.log(error);
        });
    }
  };

  return (
    <div className="all">
      <div className="App">
        <h2>Login</h2>
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
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
