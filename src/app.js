import {Router} from "./router";
import {Login} from "./components/login";
import {Signup} from "./components/signup";
import {AuthUtils} from "./utils/auth-utils";


class App {
    constructor() {
        const url = location.pathname.split("/").pop()

        if(url && url === 'login.html'){
            new Login()
        }else if(url && url === 'signup.html'){
            new Signup()
        }else {
            new Router()
        }
    }
}

(new App())