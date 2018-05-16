import { AppContainer } from "react-hot-loader"

import * as React from "react"
import { render } from "react-dom"

import App from "./App"

// render
render(
    <AppContainer>
        <App/>
    </AppContainer>,
    document.getElementById("app")
)