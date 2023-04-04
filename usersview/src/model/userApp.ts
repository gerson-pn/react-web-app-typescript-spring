import Phone from "./phone"

export default class UserApp {
    public id: number
    public name: string
    public phones: Array<Phone> = []
    public registration: string
}