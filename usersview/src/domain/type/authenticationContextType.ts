import UserApp from "../../model/userApp"

type authenticationContextType = {
    userApp: UserApp,
    token: string,
}
export default authenticationContextType