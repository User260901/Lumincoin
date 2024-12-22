import {HttpRequests} from "../utils/http-requests";
import config from "../config/config";
import {AuthUtils} from "../utils/auth-utils";

export class Signup {
    constructor() {

        if(AuthUtils.getInfo(AuthUtils.accessTokenKey)) {
            location.hash = '#/login'
        }

        this.name = document.getElementById('name');
        this.email = document.getElementById('email');
        this.password = document.getElementById('password');
        this.repeatPassword = document.getElementById('repeat-password');
        this.commonError = document.getElementById('common-error');

        document.getElementById('signup-btn').addEventListener("click", this.signup.bind(this))
    }

    validation() {
        let isValid = true;

        if (this.name.value.match(/([А-ЯЁ][а-яё]+[\s]?){3,}/)) {
            this.name.classList.remove('border-danger')
            this.name.parentElement.nextElementSibling.classList.remove('d-block')
            isValid = true;
        } else {
            this.name.classList.add('border-danger')
            this.name.parentElement.nextElementSibling.classList.add('d-block')
            isValid = false;
        }

        if (this.email.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            this.email.classList.remove('border-danger')
            this.email.parentElement.nextElementSibling.classList.remove('d-block')
            isValid = true;
        } else {
            this.email.classList.add('border-danger')
            this.email.parentElement.nextElementSibling.classList.add('d-block')
            isValid = false;
        }

        if (this.password.value.match(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
            this.password.classList.remove('border-danger')
            this.password.parentElement.nextElementSibling.classList.remove('d-block')
            isValid = true;
        } else {
            this.password.classList.add('border-danger')
            this.password.parentElement.nextElementSibling.classList.add('d-block')
            isValid = false;

        }

        if (this.password.value === this.repeatPassword.value) {
            this.repeatPassword.classList.remove('border-danger')
            this.repeatPassword.parentElement.nextElementSibling.classList.remove('d-block')
            isValid = true;
        } else {
            this.repeatPassword.classList.add('border-danger')
            this.repeatPassword.parentElement.nextElementSibling.classList.add('d-block')
            isValid = false;
        }

        return isValid;

    }

    async signup() {
        if (this.validation()) {

            let result = await HttpRequests.request("/signup", "POST", {
                name: this.name.value.split(' ')[1],
                lastName: this.name.value.split(' ')[0],
                email: this.email.value,
                password: this.password.value,
                passwordRepeat: this.repeatPassword.value
            })


            if(result.error){
                this.commonError.style.display = 'block'
                return
            }


            location.href = '/login.html'
        }
    }
}