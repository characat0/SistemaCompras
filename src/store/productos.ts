import {combine} from "@/utils/combination";
import {PARAMETROS} from "@/config";
export const PRODUCT_ROWS = 'PRODUCT_ROWS';


const pString = localStorage.getItem(PRODUCT_ROWS);
export let productRows: {codigo:string;deleted:boolean;magnitud:string;procedencia:string;protocolo:string;urgencia:string}[];
if (pString) {
    productRows = JSON.parse(pString);
} else {
    const combinacionesProductos = combine(PARAMETROS);
    for (const combinacion of combinacionesProductos) {
        combinacion.codigo = 'COMP' + combinacion.counter;
        combinacion.protocolo = 'P' + combinacion.counter;
        combinacion.deleted = false;
        delete combinacion.counter;
    }
    productRows = combinacionesProductos as unknown as {codigo:string;deleted:boolean;magnitud:string;procedencia:string;protocolo:string;urgencia:string}[];
}
