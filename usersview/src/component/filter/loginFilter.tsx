import { Component } from "react";
import { Navigate } from "react-router-dom";
import authenticationFilterType from "../../domain/type/authenticationFilterType";

export default class LoginFilter extends Component<authenticationFilterType,{}>{
    render(){
        if(this.props.token === ''){
            return <Navigate to={'/'} />
        }else{
            return this.props.component
        }
    }
}