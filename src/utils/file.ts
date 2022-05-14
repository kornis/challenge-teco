import * as path from "path";

const _BASEDIR_: string = path.join(__dirname, "..");

/**
 * @desc Retorna el path absoluto al directorio base
 * 
 * @returns Path normalizado al directorio base
 */
export function base(): string {
    return _BASEDIR_;
}

/**
 * @desc Retorna el path absoluto al directorio especificado
 * @param p Path a normalizar
 * @returns Path normalizado
 */
export function absolute(p: string): string {
    return path.join(_BASEDIR_, p);
}