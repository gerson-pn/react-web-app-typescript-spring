import { Component } from "react";
import "./index.css"
import AuthenticationContext from "../../component/context/authenticationContext";
import NonRootsLoader from "../../domain/request/nonRootsLoader";
import { Navigate } from "react-router-dom";
import SimpleAlert from "../../component/simpleAlert";
import usersAppType from "../../domain/type/userAppType";

export default class Home extends Component<{}, usersAppType> {
    static contextType = AuthenticationContext
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            data: []
        }
        this.loadData = this.loadData.bind(this)
        this.assembleData = this.assembleData.bind(this)
    }

    loadData() {
        let authenticationContext: any = this.context
        let token = authenticationContext.token
        let noRootsLoader = new NonRootsLoader()
        let state = noRootsLoader.load(token)
        state.then(element => {
            this.setState(element)
        })
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<usersAppType>, snapshot?: any): void {
        console.log(`Este componente esta atualizando com os dados: `)
        console.log(this.state)
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

    assembleData() {
        let data = this.state.data
        let component = data.map(userApp =>
            <div className="card" key={userApp.id}>
                <div className="card-header">
                    {userApp.name}
                </div>
                <div className="card-body">
                    <h5 className="card-title">Date registration: {userApp.registration}</h5>
                    <p className="card-text">Additional Information: </p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        )
        return component
    }

    redirect() {
        let authenticationContext: any = this.context
        let token = authenticationContext.token
        if (token === '') {
            return (
                <Navigate to={'/'} />
            )
        } else {
            return (
                <div className="container">
                    <SimpleAlert message={this.state.message} type="alert-warning" />
                    {this.assembleData()}
                </div>
            )
        }
    }

    render() {
        return (
            <>{this.redirect()}</>
        )
    }
}