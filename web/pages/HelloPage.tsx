import * as React from "react"

export class HelloPage extends React.Component<void, { hello }> {
    state = {
        hello: ""
    }

    render() {
        const { hello } = this.state

        return <div>Hello from server: { hello }</div>
    }

    async componentDidMount() {
        const response = await fetch("/api/hello")
        const { hello } = await response.json()
        this.setState({ hello })
    }
}