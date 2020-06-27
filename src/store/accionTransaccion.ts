import {acciones} from "@/store/acciones";
import {transacciones} from "@/store/transacciones";

export const ACCION_TRANSACCION = 'ACCION_TRANSACCION';

export let accionTransaccion: {[p: string]: string[]};
const atStr = localStorage.getItem(ACCION_TRANSACCION);
if (atStr) {
    accionTransaccion = JSON.parse(atStr)
} else {
    accionTransaccion = {
        'TRX_00': ['MET_01','MET_02','OP_02','MET_03','MET_06'],
        'TRX_01': ['OP_16','MET_07','MET_16','OP_04','MET_11'],
        'TRX_02': ['MET_16','OP_05'],
        'TRX_03': ['OP_06','MET_12','OP_07','MET_05','OP_08'],
        'TRX_04': ['OP_15','MET_14','OP_14'],
        'TRX_05': ['OP_01','OP_16','MET_11','OP_15']
    }
}
for (const k of Object.keys(accionTransaccion)) {
    if (!transacciones[k]) delete accionTransaccion[k];
}
for (const k of Object.keys(transacciones)) {
    if (!accionTransaccion[k]) accionTransaccion[k] = [];
}

const acts = Object.keys(acciones);
for (const k of Object.keys(accionTransaccion)) {
    for (let i = 0; i < accionTransaccion[k].length; i++) {
        const m = accionTransaccion[k][i];
        if (acts.indexOf(m) === -1) {
            accionTransaccion[k].splice(i, 1);
        }
    }
}