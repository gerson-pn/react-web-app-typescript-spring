import { URI } from "../uri/uri";
import UriMounter from "../uri/uriMounter";

export default class Authenticator {

    private createToken(response: Response) {
        let object = { token: '', message: '' }
        response.headers.forEach(element => {
            if (element.startsWith('Bearer ')) {
                object.token = element
            }
        })
        return object
    }
    private createMessage(response: Response) {
        let object = { token: '', message: '' }
        object.message = `something is going wrong - (Status code: ${response.status})`
        return object
    }
    private createError(error: any) {
        let object = { token: '', message: '' }
        object.message = `something is going wrong - connection fail`
        return object
    }

    public async authenticate(credential: Object) {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        let mounter = new UriMounter()
        let response = await fetch(mounter.assemble(URI.AUTHENTICATION), {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(credential)
        })
            .then(response => {
                if (response.ok) {
                    return this.createToken(response)
                } else {
                    return this.createMessage(response)
                }
            })
            .catch(error => {
                return this.createError(error)
            })
        return response;
    }
}