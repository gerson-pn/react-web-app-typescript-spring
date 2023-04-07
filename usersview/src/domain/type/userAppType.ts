import UserApp from "../../model/userApp";

type userAppType = {
    route: string,
    redirect: boolean,
    update: boolean,
    data: UserApp[],
    message: string
}

export default userAppType