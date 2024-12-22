export class AuthUtils {

    static accessTokenKey = 'token'
    static refreshTokenKey = 'refreshToken'
    static userInfo = 'userInfo'

    static setTokens(token, refreshToken, userInfo = null) {
        if (refreshToken && token) {
            localStorage.setItem(this.accessTokenKey, token);
            localStorage.setItem(this.refreshTokenKey, refreshToken);
        }
        if(userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
        }
    }

    static removeInfo() {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        localStorage.removeItem(this.userInfo);
    }

    static getInfo(info) {
        if(info) {
            return localStorage.getItem(info);
        }else {
            return null;
        }
    }
}