import Config from "../config/config";

export class HttpRequests {
    static async request(url, method = "GET", body = null) {
        const result = {
            response: null,
            error: false,
        }

        const params = {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
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
            result.error = e;
            return result
        }

        if(response.status < 200 || response.status >= 300){
            result.error = true;
            return result
        }

        return result

    }

}


//     body: JSON.stringify({
//     name: this.name.value.split(' ')[1],
//     lastName: this.name.value.split(' ')[0],
//     email:	this.email.value,
//     password: this.password.value,
//     passwordRepeat:	this.repeatPassword.value
// })
// }).then(response => response.json())
// console.log(result)