export const TRANSACCIONES = 'TRANSACCIONES';

const trString = localStorage.getItem(TRANSACCIONES);

export type transaccion = { descripcion: string };
export let transacciones: { [p: string]: transaccion };
if (trString) {
    transacciones = JSON.parse(trString);
} else {
    transacciones = {
        'TRX_00': { descripcion: 'DET_PROVEEDOR' },
        'TRX_01': { descripcion: 'ENVIAR_SOLIC_COTIZ' },
        'TRX_02': { descripcion: 'RECEP_COTIZ' },
        'TRX_03': { descripcion: 'SELECCION_COT' },
        'TRX_04': { descripcion: 'EM_ORDEN_COMP' },
        'TRX_05': { descripcion: 'REC_PEDIDO' }
    }
}