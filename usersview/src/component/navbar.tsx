import { faCircleUser, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";

export default class Navbar extends Component {
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
                                <a className="nav-link active" aria-current="page" href="/home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
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