import {AuthUtils} from "../utils/auth-utils";

export class Logout {
    constructor() {
        AuthUtils.removeInfo()
        location.href = '/login.html'
    }
}