import { Component } from "react"

type props = {
    message: string,
    type: string
}

export default class Alert extends Component<props> {
    render() {
        if (this.props.message) {
            return (
                <>
                    <br />
                    <div className={`alert ${this.props.type}`} role="alert">
                        {this.props.message}
                    </div>
                    <br />
                </>
            )
        } else {
            return <></>
        }
    }
}