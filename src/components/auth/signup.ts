import {HttpRequests} from "../../utils/http-requests";
import config from "../../config/config";
import {AuthUtils} from "../../utils/auth-utils";
import {SignUpResponseType} from "../../types/auth-types/signUp-response.type";
import {DefaultResponseType} from "../../types/response-types/default-response.type";

export class Signup {
    private name: HTMLInputElement | null;
    private email: HTMLInputElement | null;
    private password: HTMLInputElement | null;
    private repeatPassword: HTMLInputElement | null;
    private commonError: HTMLElement | null;
    private signUpBtn: HTMLElement | null;

    constructor() {

        if (AuthUtils.getInfo(AuthUtils.accessTokenKey)) {
            location.href = '/login.html'
        }

        this.name = document.getElementById('name') as HTMLInputElement;
        this.email = document.getElementById('email') as HTMLInputElement;
        this.password = document.getElementById('password') as HTMLInputElement;
        this.repeatPassword = document.getElementById('repeat-password') as HTMLInputElement;
        this.commonError = document.getElementById('common-error');

        this.signUpBtn = document.getElementById('signup-btn');
        if (this.signUpBtn) {
            this.signUpBtn.addEventListener("click", this.signup.bind(this))
        }
    }

    private validation(): boolean {
        let isValid = true;
        if (this.name) {
            if (this.name.value.match(/([А-ЯЁ][а-яё]+[\s]?){3,}/)) {
                this.name.classList.remove('border-danger')
                this.name.parentElement?.nextElementSibling?.classList.remove('d-block')
            } else {
                this.name.classList.add('border-danger')
                this.name.parentElement?.nextElementSibling?.classList.add('d-block')
                isValid = false;
            }
        }

        if(this.email){
            if (this.email.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                this.email.classList.remove('border-danger')
                this.email.parentElement?.nextElementSibling?.classList.remove('d-block')

            } else {
                this.email.classList.add('border-danger')
                this.email.parentElement?.nextElementSibling?.classList.add('d-block')
                isValid = false;
            }
        }

        if(this.repeatPassword && this.password){
            if (this.password.value.match(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
                this.password.classList.remove('border-danger')
                this.password.parentElement?.nextElementSibling?.classList.remove('d-block')

            } else {
                this.password.classList.add('border-danger')
                this.password.parentElement?.nextElementSibling?.classList.add('d-block')
                isValid = false;

            }
            if (this.password.value === this.repeatPassword.value) {
                this.repeatPassword.classList.remove('border-danger')
                this.repeatPassword.parentElement?.nextElementSibling?.classList.remove('d-block')

            } else {
                this.repeatPassword.classList.add('border-danger')
                this.repeatPassword.parentElement?.nextElementSibling?.classList.add('d-block')
                isValid = false;
            }
        }
        return isValid;
    }

    async signup() {
        if(this.name && this.email && this.email && this.password && this.repeatPassword){
            if (this.validation()) {
                let response: SignUpResponseType | DefaultResponseType = await HttpRequests.request("/signup", "POST", false, {
                    name: this.name.value.split(' ')[1],
                    lastName: this.name.value.split(' ')[0],
                    email: this.email.value,
                    password: this.password.value,
                    passwordRepeat: this.repeatPassword.value
                })

                if((response as DefaultResponseType).error !== undefined){
                    if(this.commonError){
                        this.commonError.style.display = 'block'
                        return
                    }
                }

                location.href = '/login.html'
            }

        }
    }
}