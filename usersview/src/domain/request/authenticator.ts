import loginStateType from "../type/loginStateType";
import { URI } from "../uri/uri";
import UriMounter from "../uri/uriMounter";

export default class Authenticator {
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
                    let object: loginStateType = { token: '', message: '' }
                    response.headers.forEach(element => {
                        if (element.startsWith('Bearer ')) {
                            object.token = element
                        }
                    })
                    return object
                } else {
                    let object: loginStateType = { token: '', message: '' }
                    object.message = `something is going wrong - (Status code: ${response.status})`
                    return object
                }
            })
            .catch(error => {
                let object: loginStateType = { token: '', message: '' }
                object.message = `something is going wrong - connection fail`
                return object
            })
        return response;
    }
}