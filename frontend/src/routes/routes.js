import React from 'react'
import {BrowserRouter, Switch,Route} from 'react-router-dom'
import Login from '../pages/login'
import Home from '../pages/home'
import Register from '../pages/register'

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                {/* Ruta para el Login */}
                <Route exact path='/' component={Login}></Route>
            </Switch>
            <Switch>
                {/* Ruta para el Home Page */}
                <Route exact path='/home' component={Home}></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;