import { Component } from "react";

import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Alert from "../../component/alert";
import Authenticator from "../../domain/request/authenticator";

type state = {
    message: string
    jwtToken: string
}

export default class Login extends Component<{}, state> {
    private username: string
    private password: string
    constructor(props) {
        super(props)
        this.username = ''
        this.password = ''
        this.state = { message: '', jwtToken: '' }
        this.authenticate = this.authenticate.bind(this)
        this.loadData = this.loadData.bind(this)
    }

    private loadData(event) {
        let id = event.target.id
        let value = event.target.value
        if (id === 'username') {
            this.username = value
        } else {
            this.password = value
        }
    }

    private authenticate(event) {
        event.preventDefault()
        event.target.reset()
        if (this.username && this.password) {
            let authenticator = new Authenticator()
            let credential = {
                userName: this.username,
                password: this.password
            }
            let authentication = authenticator.authenticate(credential)
            authentication.then(element => {
                this.setState(element);
            })
        } else {
            this.setState({
                message: 'Please check that username and password are correct.'
            })
        }
    }

    render() {
        return (
            <div className="container text-center flex-container">
                <form onSubmit={(event) => this.authenticate(event)} className="flex-item">
                    <Alert message={this.state.message} type="alert-warning" />
                    <legend>Authentication</legend>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input id="username" onChange={this.loadData} type="text" maxLength={6} className="form-control" placeholder="username" aria-label="username" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">#</span>
                        <input id="password" onChange={this.loadData} type="password" maxLength={6} className="form-control" placeholder="password" aria-label="password" aria-describedby="basic-addon1" />
                    </div>
                    <br />
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary btn-lg">authenticate</button>
                    </div>
                </form>
            </div>
        )
    }
}