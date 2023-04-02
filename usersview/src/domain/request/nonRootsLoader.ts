import { URI } from "../uri/uri";
import UriMounter from "../uri/uriMounter";

export default class NonRootsLoader {

    private createObject(response: Response) {
        console.log(`chegou na função createObjec`)
        let objects = []
        console.log(response)
        return objects
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

    public async load(token: string) {
        let headers = new Headers()
        headers.append('Authorization', token)
        headers.append('Content-Type', 'application/json')
        let mounter = new UriMounter()
        let response = await fetch(mounter.assemble(URI.NONROOTS), {
            method: 'GET',
            headers: headers
        })
            .then(response => {
                if (response.status === 302 ) {
                    console.log(`chegou aqui!!`)
                    console.log(response.json())
                }else{
                    console.log(`deu ruim`)
                }
            })
            .catch(error => {
                return this.createError(error)
            })
        return response;
    }
}