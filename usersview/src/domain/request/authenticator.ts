import { URI } from "../uri/uri";
import UriMounter from "../uri/uriMounter";


// .then(function (response) {
//     let token = ''

//     setState({
//         message: '',
//         jwtToken: token
//     })


export default class Authenticator {

    private createJwtTokenJson(response: Response) {
        let object = {}
        response.headers.forEach(element => {
            if (element.startsWith('Bearer ')) {
                object['jwtToken'] = element
                object['message'] = ''
            }
        })
        return object
    }
    private createMessageJson(response: Response) {
        let object = {}
        object['message'] = `something is going wrong - (Status code: ${response.status})`
        object['jwtToken'] = ''
        return object
    }
    private createErrorJson(error: any) {
        let object = {}
        object['message'] = `something is going wrong - connection fail`
        object['jwtToken'] = ''
        return object
    }

    public async authenticate(object: Object) {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        let mounter = new UriMounter()
        let response = await fetch(mounter.assemble(URI.AUTHENTICATION), {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(object)
        })
            .then(response =>{
                if(response.ok){
                    return this.createJwtTokenJson(response)
                }else{
                    return this.createMessageJson(response)
                }
            })
            .catch(error => {
                return this.createErrorJson(error)
            })
        return response as {};
    }
}