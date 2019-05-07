import { EventEmitter } from "~/utils/eventemitter";

const API_BASE = "https://conduit.productionready.io/api"

type ValidationErrors = {[index: string]: string[]}

class ApiError {
    constructor(message, errorCode = null) {
        this.message = message;
        this.errorCode = errorCode;
    }
    errors: ValidationErrors = {};
    errorCode: number = 0;
    message: string = "Api Error"
}


class ApiClient {
    onError: EventEmitter<ApiError>;

    constructor() {
        this.onError = new EventEmitter<ApiError>();
    }

    async sendRequest<T>(relative_url: string, method: string, token: string = null, payload = null): Promise<T> {
        console.log('fetching ', `${API_BASE}${relative_url}`, method);
        let headers = {}
        if (payload) {
            headers['Content-Type'] = 'application/json'
        }
        if (token) {
            headers['Authorization'] = `Token ${token}`
        }
        let res;
        try {
           res = await fetch(
                `${API_BASE}${relative_url}`,
                {
                    method: method,
                    mode: "cors",
                    headers: headers,
                    body: payload ? JSON.stringify(payload) : null
                }
            )
        } catch (e) {
            console.log("error running fetch", e)
            throw e;
        }

        if (!res.ok) {
            let err = new ApiError(res.statusText, res.status)
            if (res.status == 422) {
                try {
                    let validation_errors = await res.json();
                    err.errors = validation_errors;
                } catch {}
            }
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