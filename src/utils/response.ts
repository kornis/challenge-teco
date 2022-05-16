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
      "message": (message !== undefined) ? message : undefined
    };
  

    res.status(code).json(payload);
  
  }