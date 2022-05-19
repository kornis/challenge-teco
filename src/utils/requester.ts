import axios, { AxiosRequestHeaders } from "axios";

export class Requester {

    headers: AxiosRequestHeaders;

    constructor() {
        this.headers = {
            "Content-Type": "Application/json"
        }
    }

    async get<t>(url: string) {
        let response: any;
        try {

            response = await axios.get(url);

            const responseData: t = response.data;

            return {
                code: response.status,
                codeText: response.statusText,
                data: responseData
            }
            
        } catch(err: any) {
         
            console.error(err);
            return {
                code: err.response?.status || 404,
                codeText: err.response?.statusText,
                data: null
            }
        }
    }

    async post<t>(url: string, payload?: Record<string, any>) {
        try {

            const response = await axios.post(url, payload, {
                headers: this.headers
            });

                const responseData: t = response.data;

                return {
                    code: response?.status || 404,
                    codeText: response?.statusText,
                    data: responseData
                };

        } catch (err) {

            console.error(err);
            throw ({ error: err, message: "Error trying to send request [POST]" });

        }
    }

}