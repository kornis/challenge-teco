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
Object.defineProperty(exports, "__esModule", { value: true });
exports.absolute = exports.base = void 0;
var path = __importStar(require("path"));
var _BASEDIR_ = path.join(__dirname, "..");
/**
 * @desc Retorna el path absoluto al directorio base
 *
 * @returns Path normalizado al directorio base
 */
function base() {
    return _BASEDIR_;
}
exports.base = base;
/**
 * @desc Retorna el path absoluto al directorio especificado
 * @param p Path a normalizar
 * @returns Path normalizado
 */
function absolute(p) {
    return path.join(_BASEDIR_, p);
}
exports.absolute = absolute;
