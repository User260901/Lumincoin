import {HttpRequests} from "../../utils/http-requests";
import {AuthUtils} from "../../utils/auth-utils";
import {DefaultResponseType} from "../../types/response-types/default-response.type";
import {LoginResponseType, UserInfo} from "../../types/auth-types/login-response.type";

export class Login {
    readonly emailElement: HTMLInputElement | null;
    readonly passwordElement: HTMLInputElement | null;
    readonly checkBoxElement: HTMLInputElement | null;
    readonly commonError: HTMLElement | null;
    readonly loginBtnElement: HTMLElement | null;


    constructor() {
        this.emailElement = document.getElementById('email') as HTMLInputElement;
        this.passwordElement = document.getElementById('password') as HTMLInputElement;
        this.checkBoxElement = document.getElementById('remember') as HTMLInputElement;
        this.commonError = document.getElementById('common-error');

        this.loginBtnElement = document.getElementById('login-btn')
        if (this.loginBtnElement) {
            this.loginBtnElement.addEventListener('click', this.login.bind(this))
        }

    }

    private validation(): boolean {
        let isValid: boolean = true;

        if (this.emailElement) {
            if (this.emailElement.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                this.emailElement.classList.remove('border-danger')
                this.emailElement.parentElement?.nextElementSibling?.classList.remove('d-block')
                isValid = true;
            } else {
                this.emailElement.classList.add('border-danger')
                this.emailElement.parentElement?.nextElementSibling?.classList.add('d-block')
                isValid = false;
            }
        }

        if (this.passwordElement) {
            if (this.passwordElement.value.match(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
                this.passwordElement.classList.remove('border-danger')
                this.passwordElement.parentElement?.nextElementSibling?.classList.remove('d-block')
                isValid = true;
            } else {
                this.passwordElement.classList.add('border-danger')
                this.passwordElement.parentElement?.nextElementSibling?.classList.add('d-block')
                isValid = false;
            }
        }

        return isValid
    }

    private async login(): Promise<void> {
        if (this.emailElement && this.passwordElement && this.checkBoxElement) {
            if (this.validation()) {
                const result: DefaultResponseType | LoginResponseType = await HttpRequests.request('/login', "POST", false, {
                    "email": this.emailElement.value,
                    "password": this.passwordElement.value,
                    "rememberMe": this.checkBoxElement.checked ? "true" : "false",
                })

                if ((result as DefaultResponseType).error !== undefined) {
                    if (this.commonError) {
                        this.commonError.style.display = 'block'
                        return
                    }
                }

                this.setTokens((result as LoginResponseType))
            }

        }
    }

    setTokens(responseData: LoginResponseType){
        const userInfo = responseData.user
        AuthUtils.setTokens(responseData.tokens.accessToken, responseData.tokens.refreshToken, {
            name: userInfo.name,
            lastName: userInfo.lastName,
            id: userInfo.id,
        })

        window.location.href = '/index.html'
    }
}
