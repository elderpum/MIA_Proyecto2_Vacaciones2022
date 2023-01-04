import "./usuarios.css";
import axios from "axios";

const Usuarios = () => {
  
    const handleSubmit = async (e) => {
    e.preventDefault();

    axios.get("http://localhost:3200/api/users").then(function (response) {
      console.log(response.data.data);
    });
  };

  return (
    <>
      <h2>Tabla de Usuarios Totales</h2>
      <form className="form" onSubmit={handleSubmit}>
        <button className="primary">Actualizar tabla</button>
      </form>
    </>
  );
};

export default Usuarios;
