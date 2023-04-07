import { createContext } from "react";
import contextType from "../../domain/type/contextType";

// type contextType = {
//     token: string,
//     setToken: (data: string) => void
// }

const AuthenticationContext = createContext<contextType>({
    token: '',
    userApp: null,
    setData: () => { }
})

export default AuthenticationContext