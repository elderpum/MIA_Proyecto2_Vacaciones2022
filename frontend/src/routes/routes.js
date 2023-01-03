import React from 'react'
import {BrowserRouter, Switch,Route} from 'react-router-dom'
import Login from '../pages/login'
import Menu from '../pages/menu'

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                {/* Ruta para el Login */}
                <Route exact path='/' component={Login}></Route>
            </Switch>
            <Switch>
                {/* Ruta para el Menu Principal */}
                <Route exact path='/menu' component={Menu}></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;