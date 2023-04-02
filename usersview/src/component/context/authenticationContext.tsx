import { createContext } from "react";

type contextType = {
    token: string,
    setToken: (data: string) => void
}

const AuthenticationContext = createContext<contextType>({
    token: '',
    setToken: () => { }
})

export default AuthenticationContext