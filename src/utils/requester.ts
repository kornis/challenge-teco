import axios, { AxiosRequestHeaders } from "axios";

export class Requester {

    headers: AxiosRequestHeaders;

    constructor() {
        this.headers = {
            "Content-Type": "Application/json"
        }
    }

    async post<t>(url: string, payload?: Record<string, any>) {
        try {

            const response = await axios.post(url, payload, {
                headers: this.headers
            });

            if ([200, 400, 401, 403, 404].indexOf(response.status) > -1) {
                const responseData: t = response.data;

                return {
                    code: response.status,
                    codeText: response.statusText,
                    data: responseData
                };
            }

            return Requester.mockResponse(response.status, response.data);

        } catch (err) {

            console.error(err);
            throw ({ error: err, message: "Error trying to send request [POST]" });

        }
    }

    static mockResponse = (code: Number, exceptions: any) => ({ code, exceptions, data: null });
}