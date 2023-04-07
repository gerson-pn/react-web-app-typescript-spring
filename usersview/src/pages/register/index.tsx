import { Component } from "react";
import "./index.css"
import userAppType from "../../domain/type/userAppType";
import { Navigate } from "react-router-dom";
import Navbar from "../../component/navbar/navbar";
import SimpleAlert from "../../component/alert/simpleAlert";
import LoginFilter from "../../component/filter/loginFilter";
import AuthenticationContext from "../../component/context/authenticationContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faPhone, faPlus } from "@fortawesome/free-solid-svg-icons";
import UserApp from "../../model/userApp";
import Phone from "../../model/phone";
import NonRootsWriter from "../../domain/request/nonRootsWriter";

export default class Register extends Component<{}, userAppType>{
    static contextType = AuthenticationContext
    private username: string
    private phonenumber: string
    constructor(props) {
        super(props)
        this.state = {
            route: '',
            redirect: false,
            update: false,
            message: '',
            data: []
        }
        this.doComponent = this.doComponent.bind(this)
        this.redirect = this.redirect.bind(this)
        this.loadData = this.loadData.bind(this)
        this.doRegister = this.doRegister.bind(this)
    }

    redirect(route: string) {
        if (route !== '/register') {
            let state: userAppType = {
                route: route,
                redirect: true,
                update: false,
                message: '',
                data: this.state.data
            }
            this.setState(state)
        }
    }

    loadData(event) {
        let id = event.target.id
        let value = event.target.value
        if (id === 'username') {
            this.username = value
        } else {
            this.phonenumber = value
        }
    }

    doRegister(event) {
        event.preventDefault()
        event.target.reset()
        console.log(this.username)
        console.log(this.phonenumber)
        if (this.username && this.phonenumber) {
            let userApp = new UserApp()
            userApp.name = this.username
            let phone = new Phone()
            phone.number = this.phonenumber
            userApp.phones.push(phone)
            let nonRootsWriter = new NonRootsWriter()
            let authenticationContext: any = this.context
            let token = authenticationContext.token
            let response = nonRootsWriter.write(token, userApp)
            response.then(element =>{
                this.setState(element)
            })
        } else {
            this.setState({
                message: 'Please enter your username and phone number.'
            })
        }
    }

    doComponent() {
        let authenticationContext: any = this.context
        let component = (
            <form onSubmit={(event) => this.doRegister(event)}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faCircleUser} /></span>
                    <input onChange={(event) => this.loadData(event)} id="username" type="text" maxLength={40} className="form-control" placeholder="user name" aria-label="username" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faPhone} /></span>
                    <input onChange={(event) => this.loadData(event)} id="phonenumber" type="number" maxLength={16} className="form-control" placeholder="phone number" aria-label="phonenumber" aria-describedby="basic-addon1" />
                </div>
                <button type="submit" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /> Register</button>
            </form>
        )
        if (this.state.redirect) {
            return <Navigate to={this.state.route} />
        } else {
            return (
                <>
                    <Navbar redirect={this.redirect} userApp={authenticationContext.userApp} />
                    <br />
                    <div className="container form-register">
                        <SimpleAlert message={this.state.message} type="alert-warning" />
                        {component}
                    </div>
                </>
            )
        }

    }

    render() {
        let authenticationContext: any = this.context
        let token = authenticationContext.token
        return (<LoginFilter token={token} component={this.doComponent()} />)
    }
}