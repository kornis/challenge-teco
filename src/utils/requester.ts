import axios, { AxiosRequestHeaders } from "axios";

export class Requester {

    headers: AxiosRequestHeaders;

    constructor() {
        this.headers = {
            "Content-Type": "Application/json"
        }
    }

    async get<t>(url: string) {
        try {

            const response = await axios.get(url);

            if([200,201].indexOf(response.status) > -1) {
                const responseData: t = response.data;

                return {
                    code: response.status,
                    codeText: response.statusText,
                    data: responseData
                }
            }
        } catch(err) {
         
            console.error(err);
            throw ({ error: err, message: "Error trying to get weather by city" });
        }
    }

    async post<t>(url: string, payload?: Record<string, any>) {
        try {

            const response = await axios.post(url, payload, {
                headers: this.headers
            });

            if ([200, 201].indexOf(response.status) > -1) {
                const responseData: t = response.data;

                return {
                    code: response.status,
                    codeText: response.statusText,
                    data: responseData
                };
            }

            return {
                code: response.status,
                codeText: response.statusText,
                data: null
            };

        } catch (err) {

            console.error(err);
            throw ({ error: err, message: "Error trying to send request [POST]" });

        }
    }

}