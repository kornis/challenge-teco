import axios, { AxiosRequestHeaders } from "axios";

export class Requester {

    headers: AxiosRequestHeaders;

    constructor() {
        this.headers = {
            "Content-Type": "Application/json"
        }
    }

    async post(url: string, payload?: Record<string, any>) {
        try {

            const response = await axios.post(url, payload, {
                headers: this.headers
            });

            if ([200, 400, 401, 403, 404].indexOf(response.status) > -1) {

                return {
                    code: response.status,
                    codeText: response.statusText,
                    data: response.data
                };
            }

            return Requester.mockResponse(response.status, response.data);

        } catch (err) {

            console.error(err);
            throw ({ error: err, message: "Error trying to send request [POST]" });

        }
    }

    static mockResponse = (code: Number, exceptions: any) => ({ code, exceptions });
}