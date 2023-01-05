import React, { useState } from "react";
import "./register.css";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profilePhoto, setprofilePhoto] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [tipoUser, setTipoUser] = useState("");

  const handleChange = (e) => {
    setprofilePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !username ||
      !profilePhoto ||
      !email ||
      !password ||
      !confirmPass ||
      !tipoUser
    ) {
      alert(
        "Uno de los campos de textos está vacío. Por favor llene todos los parámetros y vuelva a intentarlo."
      );
    } else if (password !== confirmPass) {
      alert(
        "La contraseña y la confirmación no son iguales. Verifiquelo antes de continuar"
      );
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("profilePhoto", profilePhoto);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPass", confirmPass);
      formData.append("tipoUser", tipoUser);

      // Obtenemos la ruta de la api correspondiente al login
      await axios.post(
        "http://52.203.83.171:3200/api/users",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ).then(function (response) {
        console.log(response)
        alert(
          "Usuario creado con éxito. Moviéndose al formulario de verificación de Usuario."
        );
        window.location.href = "http://localhost:3000/usuarios/confirmar";
      }).catch(function (error) {
        alert("Fallo al crear el usuario. Consulte con el usuario administrador.")
        console.log(error)
      })
    }
  };

  return (
    <div className="all">
      <div className="App">
        <h2>Formulario de Registro de Usuarios</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nombre Completo</label>
            <input
              type="text"
              name="name"
              placeholder="Nombre Completo"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <label htmlFor="profilePhoto">Foto de Perfil</label>
            <input type="file" onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPass">Confirmar contraseña</label>
            <input
              type="password"
              name="confirmPass"
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="username">Tipo de Usuario</label>
            <input
              type="text"
              name="tipoUser"
              placeholder="Tipo de Usuario"
              onChange={(e) => setTipoUser(e.target.value)}
            />
          </div>
          <button className="primary">Registrar Cuenta</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
