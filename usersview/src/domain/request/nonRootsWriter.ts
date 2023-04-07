import UserApp from "../../model/userApp"
import usersAppType from "../type/userAppType"
import { URI } from "../uri/uri"
import UriMounter from "../uri/uriMounter"

export default class NonRootsWriter {
    public async write(token: string, userApp: Object) {
        let headers = new Headers()
        headers.append('Authorization', token)
        headers.append('Content-Type', 'application/json')
        let mounter = new UriMounter()
        let response = await fetch(mounter.assemble(URI.NONROOTS_WRITE), {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(userApp)
        })
            .then(response => {
                if (response.ok) {
                    let usersApp: UserApp[] = []
                    let message = 'The data has been recorded.'
                    let object: usersAppType = {
                        data: usersApp, message: message, update: false, redirect: false, route: ''
                    }
                    return object
                } else {
                    let usersApp: UserApp[] = []
                    let message = `The data has not been registered  - ${response.status}`
                    let object: usersAppType = {
                        data: usersApp, message: message, update: false, redirect: false, route: ''
                    }
                    return object
                }
            })
            .catch(error => {
                let usersApp: UserApp[] = []
                let message = 'There was a problem connecting to the server.'
                let object: usersAppType = {
                    data: usersApp, message: message, update: false, redirect: false, route: ''
                }
                return object
            })
        return response;
    }
}