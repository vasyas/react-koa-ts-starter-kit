import { hot } from "react-hot-loader"

import * as React from "react"
import { Router, Route, Switch } from "react-router"

import { history } from "../web/history"
import { LoginPage } from "./pages/LoginPage"
import { LoggedPageLayout } from "./components/layout/LoggedPageLayout"

import "./www/plugins/bootstrap/css/bootstrap.css"
import "./www/theme/scss/style.scss"
import "./www/theme/scss/colors/blue.scss"
import "./elpasoAdmin.scss"

const App = () => {
    return (
        <Router history={ history }>
            <div>
                <Switch>
                    <Route path="/logged" component={ LoggedPageLayout }/>
                    <Route path="/" component={ LoginPage }/>
                </Switch>
            </div>
        </Router>
    )
}

export default hot(module)(App)