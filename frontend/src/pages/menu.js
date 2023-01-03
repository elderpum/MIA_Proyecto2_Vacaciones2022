import { useState } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import './menu.css'
import Login from "./login";
import Register from './register'

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
      </BrowserRouter>
    </>
  );
}

export default Menu;