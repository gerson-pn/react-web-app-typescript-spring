import { Component } from "react"
import AuthenticationContext from "./authenticationContext"
import authenticationContextType from "../../domain/type/authenticationContextType"
import authenticationContextPropsType from "../../domain/type/authenticationContextPropsType"

export default class AuthenticationContextComponent extends Component<authenticationContextPropsType, authenticationContextType> {
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