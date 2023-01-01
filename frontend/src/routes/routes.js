import React from 'react'
import {BrowserRouter, Switch,Route} from 'react-router-dom'
import Login from '../pages/login'
import Register from '../pages/register'

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                {/* Ruta para el Login */}
                <Route exact path='/' component={Login}></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;