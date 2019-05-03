import { EventEmitter } from "~/utils/eventemitter";

const API_BASE="https://conduit.productionready.io/api"

class ApiError {
    constructor(message, errorCode = null) {
        this.message = message;
        this.errorCode = errorCode;
    }
    errorCode: number = 0;
    message: string = "Api Error"
}


class ApiClient {
    onError: EventEmitter<ApiError>;

    constructor() {
        this.onError = new EventEmitter<ApiError>();
    }

    async sendRequest<T>(relative_url:string, method:string, token: string):Promise<T> {
        console.log('fetching ', `${API_BASE}${relative_url}`, method);
        let res = await fetch(
            `${API_BASE}${relative_url}`,
            {
                method: method,
                mode: "cors",
                headers: token ? { "Authorization": `Token ${token}` } : {}
            }
        )
       
        if (!res.ok) {
            let err = new ApiError(res.statusText, res.status)
            this.onError.fire(err);
            throw err;
        }

        try {
            return await res.json()
        } catch {
            let err = new ApiError("Error parsing server response");
            this.onError.fire(err);
            throw err;
        }   
    }
}

export let client = new ApiClient();