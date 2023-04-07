import { Component } from "react";
import "./index.css"
import AuthenticationContext from "../../component/context/authenticationContext";
import NonRootsLoader from "../../domain/request/nonRootsLoader";
import SimpleAlert from "../../component/alert/simpleAlert";
import usersAppType from "../../domain/type/userAppType";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import Navbar from "../../component/navbar/navbar";
import LoginFilter from "../../component/filter/loginFilter";
import DateConverter from "../../domain/convert/dateConverter";
import { faAddressCard, faPhone, faTrash } from "@fortawesome/free-solid-svg-icons";
import NonRootsDeleter from "../../domain/request/nonRootsDeleter";
import { Navigate } from "react-router-dom";
import UserApp from "../../model/userApp";

export default class Home extends Component<{}, usersAppType> {
    static contextType = AuthenticationContext
    constructor(props) {
        super(props)
        this.state = {
            route: '',
            redirect: false,
            update: false,
            message: '',
            data: []
        }
        this.loadData = this.loadData.bind(this)
        this.deleteUserApp = this.deleteUserApp.bind(this)
        this.doComponent = this.doComponent.bind(this)
        this.redirect = this.redirect.bind(this)
        this.updateData = this.updateData.bind(this)
    }

    redirect(route: string) {
        if (route !== '/home') {
            let state: usersAppType = {
                route: route,
                redirect: true,
                update: false,
                message: '',
                data: this.state.data
            }
            this.setState(state)
        }
    }

    deleteUserApp(event, userAppId: number) {
        event.preventDefault()
        let authenticationContext: any = this.context
        let token = authenticationContext.token
        let userApp = new UserApp()
        userApp.id = userAppId
        let nonRootsDeleter = new NonRootsDeleter()
        let response = nonRootsDeleter.delete(token, userApp)
        response.then(element => {
            if (element.update) {
                this.updateData(element.message)
            } else {
                this.setState(element)
            }
        })
    }

    updateData(message: string){
        let authenticationContext: any = this.context
        let token = authenticationContext.token
        let noRootsLoader = new NonRootsLoader()
        let response = noRootsLoader.load(token)
        response.then(element => {
            element.message = message
            this.setState(element)
        })
    }

    loadData() {
        let authenticationContext: any = this.context
        let token = authenticationContext.token
        let noRootsLoader = new NonRootsLoader()
        let response = noRootsLoader.load(token)
        response.then(element => {
            this.setState(element)
        })
    }

    componentDidMount(): void {
        /** this line is here just to show the authentication token, used in the request */
        let authenticationContext: any = this.context
        let token = authenticationContext.token
        console.log(`token: ${token}`)
        /** */
        if (token !== '') {
            this.loadData()
        }
    }

    doComponent() {
        let authenticationContext: any = this.context
        let data = this.state.data
        let dateConverter = new DateConverter()
        let component = data.map(userApp =>
            <div key={userApp.id}>
                <div className="card">
                    <div className="card-header">
                        <FontAwesomeIcon icon={faCircleUser} /> {userApp.name}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Date registration: {dateConverter.conversion(userApp.registration)}</h5>
                        <p className="card-text"><FontAwesomeIcon icon={faAddressCard} /> Additional Information:</p>
                        {userApp.phones.map(phone =>
                            <p key={phone.id} className="card-text"><FontAwesomeIcon icon={faPhone} /> Phone number: {phone.number}</p>
                        )}
                        <form className="d-flex" onSubmit={(event) => this.deleteUserApp(event, userApp.id)}>
                            <button className="btn btn-outline-dark" type="submit"><FontAwesomeIcon icon={faTrash} /> Delete</button>
                        </form>
                    </div>
                </div>
                <br />
            </div>
        )
        if (this.state.redirect) {
            return <Navigate to={this.state.route} />
        } else {
            return (
                <>
                    <Navbar redirect={this.redirect} userApp={authenticationContext.userApp} />
                    <br />
                    <div className="container">
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