import { hot } from "react-hot-loader"

import * as React from "react"
import { Router, Route, Switch } from "react-router"

import { history } from "./history"
import { HelloPage } from "./pages/HelloPage"
import { HomePage } from "./pages/HomePage"
import { Link, NavLink } from "react-router-dom"

const App = () => {
    return (
        <Router history={ history }>
            <div>
                <div style={{ padding: 20, backgroundColor: "#ccc" }}>
                    <NavLink to="/" style={{ marginRight: 10 }}>Home</NavLink>
                    <NavLink to="/hello">Hello</NavLink>
                </div>

                <div>
                    <Switch>
                        <Route path="/hello" component={ HelloPage }/>
                        <Route path="/" component={ HomePage }/>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default hot(module)(App)