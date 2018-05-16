import { AppContainer } from "react-hot-loader"

import * as React from "react"
import { render } from "react-dom"
import { createStore, compose } from "redux"
import * as actionObject from "redux-action-object"
import * as moment from "moment"
import { Provider } from "react-redux"

import App from "./App"
import { setAuthToken, setUnauthorizedHandler } from "./services"
import { history } from "../web/history"
import { pages } from "./pages"
import { AdminModel, setActions } from "./model"

moment.locale("en")

// redux
const { actionCreators, reducer } = actionObject.split(new AdminModel())

const composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose

const store = composeEnhancers(
    actionObject.withSideEffects
)(createStore)(reducer)

setActions(actionObject.bind(actionCreators, store.dispatch))

// login
const token = sessionStorage.getItem("token")
const logged = !!token
logged && setAuthToken(token)

setUnauthorizedHandler(() => {
    history.replace(pages.login)
})

// render
render(
    <AppContainer>
        <Provider store={ store }>
            <App/>
        </Provider>
    </AppContainer>,
    document.getElementById("app")
)

document.querySelector(".preloader").remove()