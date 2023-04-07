import { Component } from "react";
import { Navigate } from "react-router-dom";
import authenticationRedirectPropsType from "../../domain/type/authenticationRedirectPropsType";

export default class LoginRedirect extends Component<authenticationRedirectPropsType,{}>{
    render(){
        if(this.props.token === ''){
            return <Navigate to={'/'} />
        }else{
            return this.props.component
        }
    }
}