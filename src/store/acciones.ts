export const ACCIONES = 'ACCIONES';

const acString = localStorage.getItem(ACCIONES);

export type accion = { descripcion: string; tipo: 'Método' | 'Operación' };
export let acciones: { [p: string]: accion };
if (acString) {
    acciones = JSON.parse(acString);
} else {
    acciones = {
        'MET_01': { descripcion: 'SELECT requerimiento_prod FROM pedido', tipo: 'Método' },
        'MET_02': { descripcion: 'SELECT tipo_compra FROM servicio_compra', tipo: 'Método' },
        'MET_03': { descripcion: 'SELECT categ_prov FROM proveedor', tipo: 'Método' },
        'MET_04': { descripcion: 'SELECT MAX(calculo) FROM proveedor', tipo: 'Método' },
        'MET_05': { descripcion: 'SELECT MAX(calculo) FROM cotización', tipo: 'Método' },
        'MET_06': { descripcion: 'SELECT * FROM proveedor ORDER BY calif_prov', tipo: 'Método' },
        'MET_07': { descripcion: 'SELECT nacionalidad FROM proveedor', tipo: 'Método' },
        'MET_08': { descripcion: 'SELECT presup_partida FROM area', tipo: 'Método' },
        'MET_09': { descripcion: 'SELECT categoria_prod FROM producto', tipo: 'Método' },
        'MET_10': { descripcion: 'SELECT cod_responsable FROM operario', tipo: 'Método' },
        'MET_11': { descripcion: 'UPDATE pedido SET estado=NULL', tipo: 'Método' },
        'MET_12': { descripcion: 'UPDATE calif_cot FROM cotización', tipo: 'Método' },
        'MET_13': { descripcion: 'UPDATE calif_prov FROM proveedor', tipo: 'Método' },
        'MET_14': { descripcion: 'UPDATE estado_orden FROM orden_compra', tipo: 'Método' },
        'MET_15': { descripcion: 'UPDATE estado_partida FROM partida', tipo: 'Método' },
        'MET_16': { descripcion: 'SELECT * FROM proveedor', tipo: 'Método' },
        'MET_17': { descripcion: 'SELECT * FROM area', tipo: 'Método' },
        'OP_01': { descripcion: 'Selección de requerimiento', tipo: 'Operación' },
        'OP_02': { descripcion: 'Determinar proveedores asociados al producto', tipo: 'Operación' },
        'OP_03': { descripcion: 'Establecer solicitud de cotización', tipo: 'Operación' },
        'OP_04': { descripcion: 'Emitir solicitud de cotización', tipo: 'Operación' },
        'OP_05': { descripcion: 'Recibir cotización', tipo: 'Operación' },
        'OP_06': { descripcion: 'Puntuar cotización', tipo: 'Operación' },
        'OP_07': { descripcion: 'Comparar cotizaciones', tipo: 'Operación' },
        'OP_08': { descripcion: 'Seleccionar cotización', tipo: 'Operación' },
        'OP_09': { descripcion: 'Establecer orden de compra', tipo: 'Operación' },
        'OP_10': { descripcion: 'Emitir orden de compra', tipo: 'Operación' },
        'OP_11': { descripcion: 'Recibir pedido', tipo: 'Operación' },
        'OP_12': { descripcion: 'Verificar recepción', tipo: 'Operación' },
        'OP_13': { descripcion: 'Actualizar comportamiento proveedor', tipo: 'Operación' },
        'OP_14': { descripcion: 'Notificar al proveedor', tipo: 'Operación' },
        'OP_15': { descripcion: 'Recibir pedido', tipo: 'Operación' },
        'OP_16': { descripcion: 'Notificar al área', tipo: 'Operación' },
    }
}