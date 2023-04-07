import UserApp from "../../model/userApp"

type loginStateType = {
    message: string,
    token: string,
    userApp: UserApp
}

export default loginStateType