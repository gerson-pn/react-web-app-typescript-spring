import { Component, ReactElement } from "react"
import AuthenticationContext from "./authenticationContext"

type state = {
    token: string
}
type props = {
    child: ReactElement
}

export default class AuthenticationContextComponent extends Component<props, state> {
    constructor(props) {
        super(props)
        this.state = { token: '' }
        this.setToken = this.setToken.bind(this)
    }
    private setToken(data: string) {
        let state = { token: data }
        this.setState(state)
    }
    render() {
        let contextData = { token: this.state.token, setToken: this.setToken }
        return (
            <AuthenticationContext.Provider value={contextData}>
                {this.props.child}
            </AuthenticationContext.Provider>
        )
    }
}