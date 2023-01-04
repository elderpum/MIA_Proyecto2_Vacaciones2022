import React, { useState } from "react";
import axios from "axios";
import "./verificarAuto.css";

const VerificarAuto = () => {
  const [idAuto, setIdAuto] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [rentaAprobada, setRentaAprobada] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idAuto || !idUsuario || !rentaAprobada) {
      alert(
        "Uno de los campos de texto está vacío. Por favor verifique sus credenciales y vuelva a intentarlo."
      );
    } else {
      const formData = new FormData();
      formData.append("idAuto", idAuto);
      formData.append("idUsuario", idUsuario);
      formData.append("rentaAprobada", rentaAprobada);

      await axios
        .put("http://localhost:3200/api/autos/confirm", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response);
          alert(
            "Auto verificado con éxito. Revise que su boleto ahora se encuentre verificado. Regresando al menú principal."
          );
          window.location.href = "http://localhost:3000/menu";
        })
        .catch(function (error) {
          alert(
            "Fallo al verificar el auto. Consulte nuevamente sus credenciales y vuelva a intentarlo."
          );
          console.log(error);
        });
    }
  };

  return (
    <div className="all">
      <div className="App">
        <h2>Formulario para Verificar Autos</h2>
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
          <div className="input-group">
            <label htmlFor="idUsuario">Id del Usuario que realizará la Renta</label>
            <input
              type="text"
              name="idUsuario"
              placeholder="Id del Usuario que realizará la Renta"
              onChange={(e) => setIdUsuario(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="idUsuario">Aprobar o Rechazar Renta de Auto</label>
            <input
              type="text"
              name="rentaAprobada"
              placeholder="Si/No"
              onChange={(e) => setRentaAprobada(e.target.value)}
            />
          </div>
          <button className="primary">Verificar Auto</button>
        </form>
      </div>
    </div>
  );
};

export default VerificarAuto;
