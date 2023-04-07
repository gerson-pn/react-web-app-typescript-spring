import { Component } from "react";
import { Navigate } from "react-router-dom";
import authenticationRedirectPropsType from "../../domain/type/authenticationRedirectPropsType";

export default class HomeRedirect extends Component<authenticationRedirectPropsType,{}>{
    render(){
        if(this.props.token === ''){
            return this.props.component
        }else{
            return <Navigate to={'/home'} />
        }
    }
}