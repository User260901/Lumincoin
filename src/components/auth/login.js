import {HttpRequests} from "../../utils/http-requests";
import {AuthUtils} from "../../utils/auth-utils";

export class Login {
    constructor() {
        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.checkBoxElement = document.getElementById('remember');
        this.commonError = document.getElementById('common-error');

        document.getElementById('login-btn').addEventListener('click', this.login.bind(this))
    }

    validation() {
        let isValid = true;

        if (this.emailElement.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
            this.emailElement.classList.remove('border-danger')
            this.emailElement.parentElement.nextElementSibling.classList.remove('d-block')
            isValid = true;
        } else {
            this.emailElement.classList.add('border-danger')
            this.emailElement.parentElement.nextElementSibling.classList.add('d-block')
            isValid = false;
        }


        if (this.passwordElement.value.match(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)){
            this.passwordElement.classList.remove('border-danger')
            this.passwordElement.parentElement.nextElementSibling.classList.remove('d-block')
            isValid = true;
        }else {
            this.passwordElement.classList.add('border-danger')
            this.passwordElement.parentElement.nextElementSibling.classList.add('d-block')
            isValid = false;
        }

        return isValid
    }

    async login() {
        if(this.validation()){
            const result = await HttpRequests.request('/login', "POST", false, {
                "email": this.emailElement.value,
                "password": this.passwordElement.value,
                "rememberMe": this.checkBoxElement.checked ? "true" : "false",
            })

            let userInfo = result.response.user

            if(!userInfo){
                this.commonError.style.display = 'block'
                return
            }


            AuthUtils.setTokens(result.response.tokens.accessToken, result.response.tokens.refreshToken, {name: userInfo.name, lastName: userInfo.lastName, id: userInfo.id})
            window.location.href = '/index.html'
        }
    }
}
