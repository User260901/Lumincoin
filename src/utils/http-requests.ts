import Config from "../config/config";
import {AuthUtils} from "./auth-utils";

export class HttpRequests {
    public static async request(url:string, method:string = "GET", useAuth:boolean = true, body:any = null):Promise<any> {
        type paramType = {
            method:string,
            headers: {"Content-type": string, "Accept":string, "x-auth-token"?:string},
            body?:any
        }
        const params:paramType = {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
        }

        let token: string | null = null
        if(useAuth) {
             token = AuthUtils.getInfo(AuthUtils.accessTokenKey);
            if(token) {
                params.headers['x-auth-token'] = token;
            }
        }
        if (body) {
            params.body = JSON.stringify(body)
        }

        let response: Response = await fetch(Config.api + url, params)

        if(response && response.status === 401) {
            if(useAuth && !token){
                location.href = '/login.html';
            }else {
               let updatedTokens:boolean = await AuthUtils.refreshToken()
                if(updatedTokens){
                   return await this.request(url, method, useAuth, body)
                }else {
                    location.hash = '#/logout'
                }
            }
        }

        return await response.json()
    }

}

