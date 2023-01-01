import React, { Component } from "react";
import logo from "./assets/logo.png";
import "./App.css";

class App extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.username.value);

    if (!e.target.username.value && !e.target.password.value) {
      alert("Llene el campo de nombre de usuario y contraseña.");
    } else if (!e.target.username.value || !e.target.password.value) {
      alert(
        "Uno de los campos está vacío. Por favor llenarlo antes de iniciar sesión."
      );
    } else {
      const data = {
        username: e.target.username.value,
        password: e.target.password.value,
      };

      // Obtenemos la ruta de la api correspondiente al login
      fetch("http://localhost:3200/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }) .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json')
        const Data = isJson && await response.json()

        if (!response.ok) {
          const error = (data && data.message) || response.status
          return Promise.reject(error)
        }

        // Here we need to move to another react page
        alert("awelas si se loguea y reconoce el usuario y la contraseña")
      }) .catch(error => {
        alert("Hubo un error al iniciar sesión. Vuelva a intentarlo")
        console.log(error)
      });
      
    }
  };

  handleClick = (e) => {
    e.preventDefault();

    alert("Goes to registration page");
  };

  render() {
    return (
      <div className="App">
        <img src={logo} className="logo" alt="Business view - Reports" />
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              name="username"
              placeholder="Nombre de Usuario"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" />
          </div>
          <button className="primary">Login</button>
        </form>
        <button className="secondary" onClick={this.handleClick}>
          Crear una Nueva Cuenta
        </button>
      </div>
    );
  }
}

export default App;
