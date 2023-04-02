import { Component } from "react";
import "./index.css"
import FullAlert from "../../component/fullAlert";
import AuthenticationContext from "../../component/context/authenticationContext";

export default class NoPage extends Component {
    static contextType = AuthenticationContext
    /**
     * In this application this method is implemented just to show the authentication
     *  token obtained by the component from the authentication context.
     */
    componentDidMount(): void {
        let authenticationContext: any = this.context
        console.log(`token: ${authenticationContext.token}`)
    }
    render() {
        return (
            <div className="container text-center flex-container">
                <div className="flex-item">
                    <FullAlert link="/" header="No page found :(" type="alert-danger" secondaryMessage="Unable to provide the requested page or content. Please verify that your request is correct" mainMessage="You probably tried to access a non-existent page or content" />
                </div>
            </div>
        )
    }
}