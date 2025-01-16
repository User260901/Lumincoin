
import Config from "../config/config";

export class AuthUtils {

    static accessTokenKey = 'accessToken';
    static refreshTokenKey = 'refreshToken';
    static userInfo = 'userInfo';

    static setTokens(accessToken, refreshToken, userInfo = null) {
        if (refreshToken && accessToken) {
            localStorage.setItem(this.accessTokenKey, accessToken);
            localStorage.setItem(this.refreshTokenKey, refreshToken);
        }
        if (userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
        }
    }

    static removeInfo() {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        localStorage.removeItem(this.userInfo);
    }

    static getInfo(info) {
        if (info) {
            return localStorage.getItem(info);
        }
    }

    static async refreshToken() {
        let result = false
        let refreshToken = this.getInfo(this.refreshTokenKey);
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