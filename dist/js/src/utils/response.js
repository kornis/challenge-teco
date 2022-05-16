"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusCode = exports.badRequest = exports.ok = void 0;
var ok = function (res, data) {
    var payload = {
        "code": 200,
        "data": data ? data : null
    };
    return res.status(200).json(payload);
};
exports.ok = ok;
var badRequest = function (res, message) {
    var payload = {
        "code": 400,
        "message": (message !== undefined) ? message : "Parametros inválidos"
    };
    return res.status(400).json(payload);
};
exports.badRequest = badRequest;
function statusCode(res, code, message) {
    var payload = {
        "code": code,
        "message": (message !== undefined) ? message : undefined
    };
    res.status(code).json(payload);
}
exports.statusCode = statusCode;
