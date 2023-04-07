import UserApp from "../../model/userApp"

type navbarPropsType = {
    userApp: UserApp
    redirect: (route: string) => void
}

export default navbarPropsType