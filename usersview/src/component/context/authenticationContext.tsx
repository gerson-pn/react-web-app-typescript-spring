import { createContext } from "react";
import contextType from "../../domain/type/contextType";

const AuthenticationContext = createContext<contextType>({
    token: '',
    userApp: null,
    setData: () => { }
})

export default AuthenticationContext