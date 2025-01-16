import {Router} from "./router";
import {Login} from "./components/auth/login";
import {Signup} from "./components/auth/signup";



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