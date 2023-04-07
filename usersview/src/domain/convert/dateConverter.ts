export default class DateConverter {
    public conversion(date: string) {
        let raw = new Date(date)
        return raw.toLocaleTimeString()
    }
}