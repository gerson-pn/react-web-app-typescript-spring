import { Component } from "react";
import { Navigate } from "react-router-dom";
import authenticationFilterType from "../../domain/type/authenticationFilterType";

export default class HomeFilter extends Component<authenticationFilterType,{}>{
    render(){
        if(this.props.token === ''){
            return this.props.component
        }else{
            return <Navigate to={'/home'} />
        }
    }
}