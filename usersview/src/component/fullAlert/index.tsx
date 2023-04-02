import { Component } from "react"

type props = {
    header: string,
    mainMessage: string,
    secondaryMessage: string,
    link: string
    type: string
}

export default class FullAlert extends Component<props> {
    private hasHeader(header: string) {
        if (header) {
            return (
                <h4 className="alert-heading">{header}</h4>
            )
        }
    }
    private hasLink(link: string) {
        if (link) {
            return (
                <a href={`${link}`} className="alert-link">Click here to return!</a>
            )
        }
    }
    render() {
        if (this.props.mainMessage && this.props.type && this.props.secondaryMessage) {
            return (
                <>
                    <br />
                    <div className={`alert ${this.props.type}`} role="alert">
                        {this.hasHeader(this.props.header)}
                        <p>{this.props.mainMessage}</p>
                        <hr />
                        <p className="mb-0">{this.props.secondaryMessage} {this.hasLink(this.props.link)}</p>
                    </div>
                    <br />
                </>
            )
        } else {
            return <></>
        }
    }
}