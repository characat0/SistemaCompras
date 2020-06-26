import {PARAMETROS} from "@/config";
export const P_CUANTIAS = 'P_CUANTIAS';

export let cuantias: any = localStorage.getItem(P_CUANTIAS);
if (cuantias) {
    cuantias = JSON.parse(cuantias);
} else {
    const nombresTipoProducto = Object.keys(PARAMETROS.naturaleza);
    const parametrosCuantia: { [p: string]: any } = {};
    const tipoMagnitud = Object.values(PARAMETROS.magnitud);
    const nombresTipoMagnitud = Object.keys(PARAMETROS.magnitud);
    nombresTipoMagnitud.pop()
    tipoMagnitud.pop();
    for (const tipo of nombresTipoProducto) {
        parametrosCuantia[tipo] = {};
        for (const nombre of nombresTipoMagnitud) {
            parametrosCuantia[tipo][nombre] = 0;
        }
    }
    cuantias = parametrosCuantia;
}