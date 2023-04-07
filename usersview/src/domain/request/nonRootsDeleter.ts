import UserApp from "../../model/userApp"
import usersAppType from "../type/userAppType"
import { URI } from "../uri/uri"
import UriMounter from "../uri/uriMounter"

export default class NonRootsDeleter {
    public async delete(token: string, userApp: UserApp) {
        let headers = new Headers()
        headers.append('Authorization', token)
        headers.append('Content-Type', 'application/json')
        let mounter = new UriMounter()
        let response = await fetch(mounter.assemble(URI.NONROOTS_DELETE), {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify(userApp)
        })
            .then(response => {
                if (response.ok) {
                    let usersApp: UserApp[] = []
                    let message = 'The data has been deleted.'
                    let object: usersAppType = {
                        data: usersApp, message: message, update: true, redirect: false, route: ''
                    }
                    return object
                } else {
                    let usersApp: UserApp[] = []
                    let message = 'The data has not been deleted.'
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