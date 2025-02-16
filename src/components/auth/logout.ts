import {AuthUtils} from "../../utils/auth-utils";
import config from "../../config/config";
import {DefaultResponseType} from "../../types/response-types/default-response.type";

export class Logout {
    constructor() {
        this.init().then()

    }

    private async init():Promise<void>{
        if(AuthUtils.refreshTokenKey) {
            let result: DefaultResponseType | null = null
            try {
                let response: Response = await fetch(config.api + '/logout', {
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
                if((result as DefaultResponseType).error ){
                    console.log((result as DefaultResponseType).message)
                    return
                }

            }catch (e:any){
                throw new Error(e)
            }
        }
        AuthUtils.removeInfo()
        location.href = '/login.html'
    }
}