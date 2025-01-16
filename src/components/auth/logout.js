import {AuthUtils} from "../../utils/auth-utils";
import {HttpRequests} from "../../utils/http-requests";
import config from "../../config/config";

export class Logout {
    constructor() {
        this.init().then()

    }

    async init(){
        if(AuthUtils.refreshTokenKey) {
            let result = null
            try {
                let response = await fetch(config.api + '/logout', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        refreshToken: AuthUtils.refreshTokenKey,
                    })
                })
                result = await response.json()

                if(!result.error){
                    console.log(result.message)
                }
            }catch (e){
                throw new Error(e)
            }
        }
        AuthUtils.removeInfo()
        location.href = '/login.html'
    }
}