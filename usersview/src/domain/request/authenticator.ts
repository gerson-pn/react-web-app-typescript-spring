import CredentialApp from "../../model/credentialApp";
import Phone from "../../model/phone";
import UserApp from "../../model/userApp";
import loginStateType from "../type/loginStateType";
import { URI } from "../uri/uri";
import UriMounter from "../uri/uriMounter";

export default class Authenticator {
    public async authenticate(credentialApp: CredentialApp) {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        let mounter = new UriMounter()
        let reponse = await fetch(mounter.assemble(URI.AUTHENTICATION), {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(credentialApp)
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                let json: loginStateType = { token: '', message: '', userApp: null }
                json.message = `something is going wrong - ${response.status}`
                return json
            }
        })
            .then(json => {
                if (json.token === '') {
                    let object: loginStateType = { token: '', message: json.message, userApp: null }
                    return object
                } else {
                    let userApp = new UserApp()
                    userApp.id = json.user.id
                    userApp.name = json.user.name
                    userApp.registration = json.user.registration
                    json.user.phones.forEach(jsonPhone => {
                        let phone = new Phone()
                        phone.id = jsonPhone.id
                        phone.number = jsonPhone.number
                        userApp.phones.push(phone)
                    })
                    let object: loginStateType = { token: json.token, message: '', userApp: userApp }
                    return object
                }
            })
            .catch(error => {
                let object: loginStateType = { token: '', message: '', userApp: null }
                object.message = `something is going wrong - connection fail`
                return object
            })
        return reponse;
    }
}

