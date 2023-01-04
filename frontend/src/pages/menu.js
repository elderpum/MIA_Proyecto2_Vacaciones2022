import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import './menu.css'
import Login from "./login";
import Register from './register'
import EliminarUsuario from './eliminarUsuario'
import VerificarUsuario from './verificarUsuario'

function Menu() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/usuarios/crear' component={Register}></Route>
        </Switch>
        <Switch>
          <Route exact path='/menu'></Route>
        </Switch>
        <Switch>
          <Route exact path='/' component={Login}></Route>
        </Switch>
        <Switch>
          <Route exact path='/usuarios/confirmar' component={VerificarUsuario}></Route>
        </Switch>
        <Switch>
          <Route exact path='/usuarios/eliminar' component={EliminarUsuario}></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Menu;