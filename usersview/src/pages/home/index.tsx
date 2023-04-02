import { Component } from "react";
import "./index.css"
import AuthenticationContext from "../../component/context/authenticationContext";
import NonRootsLoader from "../../domain/request/nonRootsLoader";

export default class Home extends Component<{}, {}> {
    static contextType = AuthenticationContext
    constructor(props) {
        super(props)
        this.load = this.load.bind(this)
    }

    private load(token: string) {
        let noRootsLoader = new NonRootsLoader()
        noRootsLoader.load(token)
    }

    componentDidMount(): void {
        let authenticationContext: any = this.context
        let token = authenticationContext.token
        console.log(`token: ${token}`)

        this.load(token)
    }

    render() {
        return (
            <div className="container flex-container">
                <div className="list-group flex-item">
                    <a href="/" className="list-group-item list-group-item-action active" aria-current="true">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">List group item heading</h5>
                            <small>3 days ago</small>
                        </div>
                        <p className="mb-1">Some placeholder content in a paragraph.</p>
                        <small>And some small print.</small>
                    </a>
                    <a href="/" className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">List group item heading</h5>
                            <small className="text-body-secondary">3 days ago</small>
                        </div>
                        <p className="mb-1">Some placeholder content in a paragraph.</p>
                        <small className="text-body-secondary">And some muted small print.</small>
                    </a>
                    <a href="/" className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">List group item heading</h5>
                            <small className="text-body-secondary">3 days ago</small>
                        </div>
                        <p className="mb-1">Some placeholder content in a paragraph.</p>
                        <small className="text-body-secondary">And some muted small print.</small>
                    </a>
                </div>
            </div>
        )
    }
}