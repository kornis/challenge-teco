"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
var fs = __importStar(require("fs"));
var file = __importStar(require("./utils/file"));
var express_1 = __importDefault(require("express"));
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var Server = /** @class */ (function () {
    function Server() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        this.app.set("port", process.env.PORT || 3000);
    };
    Server.prototype.routes = function () {
        var _this = this;
        try {
            fs.readdirSync(file.absolute("Infrastructure/routes")).forEach(function (fileName) {
                require(file.absolute("Infrastructure/routes/".concat(fileName))).default(_this.app);
            });
        }
        catch (err) {
            if (err.error === "ENOENT") {
                console.warn("server.js (start): [API] no existen rutas adicionales definidas");
            }
            else {
                console.error("server.js (start): (".concat(err.stack, ")"));
            }
        }
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get("port"), function () { return console.log("Server listening to port " + _this.app.get("port")); });
    };
    Server.prototype.getApp = function () {
        return this.app;
    };
    return Server;
}());
exports.server = new Server();
exports.server.start();
