import "./vuelos.css";
import axios from "axios";

const Vuelos = () => {
  
    const handleSubmit = async (e) => {
    e.preventDefault();

    axios.get("http://52.203.83.171:3200/api/vuelos").then(function (response) {
      console.log(response.data.data);
    });
  };

  return (
    <>
      <h2>Tabla de Vuelos Totales</h2>
      <form className="form" onSubmit={handleSubmit}>
        <button className="primary">Actualizar tabla</button>
      </form>
    </>
  );
};

export default Vuelos;