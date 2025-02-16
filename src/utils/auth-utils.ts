
import Config from "../config/config";
import {UserInfo} from "../types/auth-types/login-response.type";

export class AuthUtils {

    static accessTokenKey = 'accessToken';
    static refreshTokenKey = 'refreshToken';
    static userInfo = 'userInfo';

    public static setTokens(accessToken:string, refreshToken:string, userInfo:UserInfo | null = null):void {
        if (refreshToken && accessToken) {
            localStorage.setItem(this.accessTokenKey, accessToken);
            localStorage.setItem(this.refreshTokenKey, refreshToken);
        }
        if (userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
        }
    }

    public static removeInfo():void {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        localStorage.removeItem(this.userInfo);
    }

    public static getInfo(info:string):string | null {
        if (info) {
            return localStorage.getItem(info);
        }else {
            return null
        }
    }

    public static async refreshToken():Promise<boolean> {
        let result:boolean = false
        let refreshToken:string | null = this.getInfo(this.refreshTokenKey);
        if(refreshToken) {
            const response = await fetch(Config.api + '/refresh', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        refreshToken: refreshToken
                    }),
                }
            )

            if(response && response.status === 200) {
                let tokens = await response.json()
                if(tokens && !tokens.error) {
                    this.setTokens(tokens.tokens.accessToken, tokens.tokens.refreshToken)
                    result = true
                }
            }
        }

        if(!result) {
            this.removeInfo()
        }

        return result
    }

}