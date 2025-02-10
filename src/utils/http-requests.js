import Config from "../config/config";
import {AuthUtils} from "./auth-utils";

export class HttpRequests {
    static async request(url, method = "GET", useAuth = true, body = null) {
        const result = {
            response: null,
            error: false,
            status: null
        }

        const params = {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
        }

        let token = null
        if(useAuth) {
             token = AuthUtils.getInfo(AuthUtils.accessTokenKey);
            if(token) {
                params.headers['x-auth-token'] = token;
            }
        }

        if (body) {
            params.body = JSON.stringify(body)
        }

        let response = null
        try {
            response = await fetch(Config.api + url, params)
            result.response = await response.json()
        }catch (e){
            result.error = e
            return result
        }

        if(response && response.status === 401) {
            if(useAuth && !token){
                location.href = '/login.html';
            }else {
               let updatedTokens = await AuthUtils.refreshToken()
                if(updatedTokens){
                   return await this.request(url, method, useAuth, body)
                }else {
                    location.hash = '#/logout'
                }
            }
        }

        return result
    }

}

