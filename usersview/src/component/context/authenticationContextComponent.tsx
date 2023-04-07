import { Component } from "react"
import AuthenticationContext from "./authenticationContext"
import authenticationContextType from "../../domain/type/authenticationContextType"
import authenticationContextPropsType from "../../domain/type/authenticationContextPropsType"
import UserApp from "../../model/userApp"

export default class AuthenticationContextComponent extends Component<authenticationContextPropsType, authenticationContextType> {
    constructor(props) {
        super(props)
        this.state = { token: '', userApp: null }
        this.setData = this.setData.bind(this)
    }
    setData(newToken: string, newUserApp: UserApp) {
        let state = { token: newToken, userApp: newUserApp }
        this.setState(state)
    }
    render() {
        let contextData = {
            token: this.state.token,
            userApp: this.state.userApp,
            setData: this.setData
        }
        return (
            <AuthenticationContext.Provider value={contextData}>
                {this.props.child}
            </AuthenticationContext.Provider>
        )
    }
}