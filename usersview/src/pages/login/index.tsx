import { Component } from "react";

import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Authenticator from "../../domain/request/authenticator";
import SimpleAlert from "../../component/alert/simpleAlert";
import AuthenticationContext from "../../component/context/authenticationContext";
import loginStateType from "../../domain/type/loginStateType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faEyeSlash, faKey, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import HomeFilter from "../../component/filter/homeFilter";
import CredentialApp from "../../model/credentialApp";

export default class Login extends Component<{}, loginStateType> {
    static contextType = AuthenticationContext
    private username: string
    private password: string
    constructor(props) {
        super(props)
        this.username = ''
        this.password = ''
        this.state = { message: '', token: '', userApp: null }
        this.authenticate = this.authenticate.bind(this)
        this.loadData = this.loadData.bind(this)
        this.doComponent = this.doComponent.bind(this)
    }

    loadData(event) {
        let id = event.target.id
        let value = event.target.value
        if (id === 'username') {
            this.username = value
        } else {
            this.password = value
        }
    }

    authenticate(event) {
        event.preventDefault()
        event.target.reset()
        if (this.username && this.password) {
            let authenticator = new Authenticator()
            let credentialApp = new CredentialApp()
            credentialApp.userName = this.username
            credentialApp.password = this.password
            let authentication = authenticator.authenticate(credentialApp)
            authentication.then(response =>{
                if(response.message !== ''){
                    this.setState(response)
                }else{
                    let authenticationContext: any = this.context
                    authenticationContext.setData(response.token, response.userApp)
                }
            })
        } else {
            this.setState({
                message: 'Please check that username and password are correct.'
            })
        }
    }

    doComponent() {
        return (
            <div className="container text-center flex-container-login">
                <form onSubmit={(event) => this.authenticate(event)} className="flex-item-login">
                    <SimpleAlert message={this.state.message} type="alert-warning" />
                    <legend><FontAwesomeIcon icon={faShieldHalved} /> Authentication</legend>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faCircleUser} /></span>
                        <input id="username" onChange={this.loadData} type="text" maxLength={6} className="form-control" placeholder="username" aria-label="username" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faEyeSlash} /></span>
                        <input id="password" onChange={this.loadData} type="password" maxLength={6} className="form-control" placeholder="password" aria-label="password" aria-describedby="basic-addon1" />
                    </div>
                    <br />
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary btn-lg"><FontAwesomeIcon icon={faKey} /> authenticate</button>
                    </div>
                </form>
            </div>
        )
    }

    render() {
        let authenticationContext: any = this.context
        let token = authenticationContext.token
        return (
            <HomeFilter token={token} component={this.doComponent()} />
        )
    }
}