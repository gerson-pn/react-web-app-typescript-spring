import { URI } from "./uri"

export default class UriMounter {
    private port = '5555'
    private server = 'http://localhost'

    public assemble(uri: URI) {
        return `${this.server}:${this.port}${uri}`
    }
}