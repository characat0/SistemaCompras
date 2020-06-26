
export const REGLAS = 'REGLAS';

export let reglasNegocio: any = localStorage.getItem(REGLAS);
if (reglasNegocio) {
    reglasNegocio = JSON.parse(reglasNegocio);
} else {
    const initialRules = [
        { codigo: 'R01', parametro: 'CALIF_MIN_PROV', valor: '10', operador: '>=', verdadero: 'PROVEEDOR=PARTICIPANTE', falso: 'PROVEEDOR=NO PARTICIPANTE', descripcion:'' },
        { codigo: 'R02', parametro: 'NDIAS_PERMITIDOS_PEDIDOS', valor: '30', operador: '<=', verdadero: 'ESTADO_PEDIDO=ATENDIDO', falso: 'ESTADO_PEDIDO=POSPUESTO', descripcion:'' }
    ]
    for (const rule of initialRules) {
        rule.descripcion = `${rule.parametro} ${rule.operador} ${rule.valor}`
    }
    reglasNegocio = initialRules;
}
