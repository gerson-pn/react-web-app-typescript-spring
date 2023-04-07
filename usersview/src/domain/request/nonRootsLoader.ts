import Phone from "../../model/phone";
import UserApp from "../../model/userApp";
import usersAppType from "../type/userAppType";
import { URI } from "../uri/uri";
import UriMounter from "../uri/uriMounter";

export default class NonRootsLoader {

    public async load(token: string) {
        let headers = new Headers()
        headers.append('Authorization', token)
        headers.append('Content-Type', 'application/json')
        let mounter = new UriMounter()
        let response = await fetch(mounter.assemble(URI.NONROOTS), {
            method: 'GET',
            headers: headers
        })
            .then(response => response.json())
            .then(json => {
                let usersApp: UserApp[] = []

                json.forEach(element => {
                    let userApp = new UserApp()
                    userApp.id = element.id
                    userApp.name = element.name
                    userApp.registration = element.registration
                    element.phones.forEach(elementPhone => {
                        let phone = new Phone()
                        phone.id = elementPhone.id
                        phone.number = elementPhone.number
                        userApp.phones.push(phone)
                    })
                    usersApp.push(userApp)
                });

                let message = ''
                if (usersApp.length === 0) {
                    message = `No data to be displayed.`
                }
                let object: usersAppType = {
                    data: usersApp, message: message, update: false, redirect: false, route: ''
                }
                return object
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