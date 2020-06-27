import {productRows} from "@/store/productos";
import {transacciones} from "@/store/transacciones";

export const PROTOCOLO_TRANSACCION = 'PROTOCOLO_TRANSACCION';

const ptStr = localStorage.getItem(PROTOCOLO_TRANSACCION);
export let protocoloTransaccion: {[p: string]: string[]};

if (ptStr) {
    protocoloTransaccion = JSON.parse(ptStr);
} else {
    protocoloTransaccion = {};
    for (const row of Object.values(productRows)) {
        protocoloTransaccion[row.protocolo] = [];
        for (const t of Object.keys(transacciones)) {
            protocoloTransaccion[row.protocolo].push(t);
        }
    }
}