import Vue from 'vue'
import Vuex from 'vuex'
import { PARAMETROS } from "@/config";
import {combine} from "@/utils/combination";
const LOGGED = 'LOGGED', PRODUCT_ROWS = 'PRODUCT_ROWS', P_CUANTIAS = 'P_CUANTIAS', NACIONALIDAD = 'NACIONALIDAD', REGLAS = 'REGLAS';

let reglasNegocio: any = localStorage.getItem(REGLAS);
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


let productRows = localStorage.getItem(PRODUCT_ROWS);
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

let cuantias: any = localStorage.getItem(P_CUANTIAS);
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

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    logged: localStorage.getItem(LOGGED) === 'true',
    productRows,
    navDrawerActive: false,
    cuantias,
    nacionalidad: localStorage.getItem(NACIONALIDAD),
    reglasNegocio
  },
  mutations: {
    logged(state, value) {
      state.logged = value;
      localStorage.setItem(LOGGED, value.toString());
    },
    toggle(state) {
      state.navDrawerActive = !state.navDrawerActive;
    },
    changeProductRows(state, value) {
      state.productRows = value;
      localStorage.setItem(PRODUCT_ROWS, JSON.stringify(value));
    },
    changeCuantias(state, value) {
      state.cuantias = value;
      localStorage.setItem(P_CUANTIAS, JSON.stringify(value));
    },
    setNacionalidad(state, value) {
      state.cuantias = value;
      localStorage.setItem(NACIONALIDAD, value);
    },
    changeReglasNegocio(state, value) {
      state.reglasNegocio = value;
      localStorage.setItem(REGLAS, JSON.stringify(value));
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    logged: state => state.logged,
    drawer: state => state.navDrawerActive,
    productRows: state => state.productRows,
    cuantias: state => state.cuantias,
    nacionalidad: state => state.nacionalidad,
    reglas: state => state.reglasNegocio
  }
})
