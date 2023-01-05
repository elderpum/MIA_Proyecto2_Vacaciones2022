import "./autos.css";
import axios from "axios";

const Autos = () => {
  
    const handleSubmit = async (e) => {
    e.preventDefault();

    axios.get("http://3.94.79.239:3200/api/autos").then(function (response) {
      console.log(response.data.data);
    });
  };

  return (
    <>
      <h2>Tabla de Autos Totales</h2>
      <form className="form" onSubmit={handleSubmit}>
        <button className="primary">Actualizar tabla</button>
      </form>
    </>
  );
};

export default Autos;
