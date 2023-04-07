import { faCircleUser, faDoorOpen, faHouse, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import navbarPropsType from "../../domain/type/navbarPropsType";

export default class Navbar extends Component<navbarPropsType, {}> {
    constructor(props) {
        super(props)
        this.redirect = this.redirect.bind(this)
        this.formatName = this.formatName.bind(this)
    }

    formatName(name: string) {
        if (name.length > 10) {
            let newName = name.substring(0, 10)
            return newName
        } else {
            return name
        }
    }

    redirect(event) {
        event.preventDefault()
        let route = `/${event.target.id}`
        this.props.redirect(route)
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1"><FontAwesomeIcon icon={faCircleUser} /> Users App</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link disabled" href="/">Welcome {this.formatName(this.props.userApp.name)}!</a>
                            </li>
                            <li className="nav-item">
                                <a id="home" className="nav-link" onClick={(event) => this.redirect(event)} href="/home"><FontAwesomeIcon icon={faHouse} /> Home</a>
                            </li>
                            <li className="nav-item">
                                <a id="register" className="nav-link" onClick={(event) => this.redirect(event)} href="/register"><FontAwesomeIcon icon={faPlus} /> Register</a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <button className="btn btn-outline-dark" type="submit"><FontAwesomeIcon icon={faDoorOpen} /> Log out</button>
                        </form>
                    </div>
                </div>
            </nav>
        )
    }
}