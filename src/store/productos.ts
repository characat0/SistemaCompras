import {combine} from "@/utils/combination";
import {PARAMETROS} from "@/config";
export const PRODUCT_ROWS = 'PRODUCT_ROWS';

export let productRows = localStorage.getItem(PRODUCT_ROWS);
if (productRows) {
    productRows = JSON.parse(productRows);
} else {
    const combinacionesProductos = combine(PARAMETROS);
    for (const combinacion of combinacionesProductos) {
        combinacion.codigo = 'COMP' + combinacion.counter;
        combinacion.protocolo = 'P' + combinacion.counter;
        combinacion.deleted = false;
        delete combinacion.counter;
    }
    productRows = combinacionesProductos;
}
