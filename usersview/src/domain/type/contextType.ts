import UserApp from "../../model/userApp"

type contextType = {
    userApp: UserApp,
    token: string,
    setData: (token: string, userApp: UserApp) => void
}

export default contextType