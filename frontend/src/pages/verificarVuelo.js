import React, { useState } from "react";
import axios from "axios";
import "./verificarVuelo.css"

const VerificarVuelo = () => {
  const [idVuelo, setIdVuelo] = useState("");
  const [idUsuario, setIdUsuario] = useState("")
  const [vueloAprobado, setVueloAprobado] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idVuelo || !idUsuario || !vueloAprobado) {
      alert(
        "Uno de los campos de texto está vacío. Por favor verifique sus credenciales y vuelva a intentarlo."
      );
    } else {

    const formData = new FormData()
    formData.append("idVuelo", idVuelo)
    formData.append("idUsuario", idUsuario)
    formData.append("vueloAprobado", vueloAprobado)

      await axios
        .put("http://localhost:3200/api/vuelos/confirm", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response);
          alert(
            "Vuelo verificado con éxito. Revise que su boleto ahora se encuentre verificado. Regresando al menú principal."
          );
          window.location.href = "http://localhost:3000/menu";
        })
        .catch(function (error) {
          alert(
            "Fallo al verificar el vuelo. Consulte nuevamente sus credenciales y vuelva a intentarlo."
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
          <div className="input-group">
            <label htmlFor="idUsuario">Id del Usuario dueño del Boleto</label>
            <input
              type="text"
              name="idUsuario"
              placeholder="Id del Usuario dueño del boleto"
              onChange={(e) => setIdUsuario(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="idUsuario">Aprobar o Rechazar Vuelo</label>
            <input
              type="text"
              name="vueloAprobado"
              placeholder="Si/No"
              onChange={(e) => setVueloAprobado(e.target.value)}
            />
          </div>
          <button className="primary">Verificar Vuelo</button>
        </form>
      </div>
    </div>
  );
};

export default VerificarVuelo;