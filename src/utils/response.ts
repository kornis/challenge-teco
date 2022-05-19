import express from "express"

export const ok = (res: express.Response, data: unknown ) => {

    const payload = {
        "code": 200,
        "data": data ? data : null
      };
    return res.status(200).json(payload);
}

export const badRequest = (res: express.Response, message?: string) => {

    const payload = {
        "code": 400,
        "message": (message !== undefined) ? message : "Parametros inválidos"
      };

    return res.status(400).json(payload);
}


export function statusCode(res: express.Response, code: number, message?: string): void {
    const payload = {
      "code": code,
      "message": (message !== undefined) ? message : httpCodes[code]
    };
  

    res.status(code).json(payload);
  
  }

const httpCodes: Record<number, string> = {
  200: "OK",
  201: "Created",
  202: "Accepted",
  400: "Bad request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  500: "Internal error"
}
