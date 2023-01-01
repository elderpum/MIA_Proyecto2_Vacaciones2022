import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Formulario de Registro</h2>
        <form className="form" onSubmit={this.handleSubmit}>
        <div className="input-group">
            <label htmlFor="name">Nombre Completo</label>
            <input type="text" name="name" placeholder="Nombre Completo"/>
          </div>
          <div className="input-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input type="text" name="username" placeholder="Nombre de Usuario"/>
          </div>
          <div className="input-group">
            <label htmlFor="profilePhoto">Foto de Perfil</label>
            <input type="file" name="profilePhoto"/>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="example@gmail.com"/>
          </div>
          <div className="input-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input type="text" name="username" placeholder="Nombre de Usuario"/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPass">Confirmar contraseña</label>
            <input type="password" name="confirmPass" />
          </div>
          <button className="primary">Registrar Cuenta</button>
        </form>
        <button className="secondary" onClick={this.handleClick}>
          Crear una Nueva Cuenta
        </button>
      </div>
    );
  }
}

export default App;