import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import './menu.css'
import Login from "./login";
import Usuarios from './usuarios'
import Register from './register'
import EliminarUsuario from './eliminarUsuario'
import VerificarUsuario from './verificarUsuario'
import Vuelos from "./vuelos";
import CrearVuelo from "./crearVuelo";
import EliminarVuelo from "./eliminarVuelo";
import VerificarVuelo from "./verificarVuelo";

function Menu() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/menu'></Route>
        </Switch>
        <Switch>
          <Route exact path='/usuarios' component={Usuarios}></Route>
        </Switch>
        <Switch>
          <Route exact path='/usuarios/crear' component={Register}></Route>
        </Switch>
        <Switch>
          <Route exact path='/usuarios/eliminar' component={EliminarUsuario}></Route>
        </Switch>
        <Switch>
          <Route exact path='/usuarios/confirmar' component={VerificarUsuario}></Route>
        </Switch>
        <Switch>
          <Route exact path='/vuelos' component={Vuelos}></Route>
        </Switch>
        <Switch>
          <Route exact path='/vuelos/crear' component={CrearVuelo}></Route>
        </Switch>
        <Switch>
          <Route exact path='/vuelos/eliminar' component={EliminarVuelo}></Route>
        </Switch>
        <Switch>
          <Route exact path='/vuelos/confirmar' component={VerificarVuelo}></Route>
        </Switch>
        <Switch>
          <Route exact path='/' component={Login}></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Menu;