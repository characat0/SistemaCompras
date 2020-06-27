import Vue from 'vue'
import Vuex from 'vuex'
import {cuantias, P_CUANTIAS} from "@/store/parametros";
import {REGLAS, reglasNegocio} from "@/store/reglas";
import {PRODUCT_ROWS, productRows} from "@/store/productos";
import {accion, acciones, ACCIONES} from "@/store/acciones";
import {transaccion, transacciones, TRANSACCIONES } from "@/store/transacciones";

const LOGGED = 'LOGGED', NACIONALIDAD = 'NACIONALIDAD';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged: localStorage.getItem(LOGGED) === 'true',
    productRows,
    navDrawerActive: false,
    cuantias,
    nacionalidad: localStorage.getItem(NACIONALIDAD),
    reglasNegocio,
    acciones,
    transacciones
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
    },
    changeAcciones(state, value: {codigo:string; descripcion: string; tipo: 'Método' | 'Operación' }[]) {
      const acciones: {[p: string]: accion} = {};
      for (const e of value) {
        acciones[e.codigo] = {descripcion: e.descripcion, tipo: e.tipo};
      }
      state.acciones = acciones;
      localStorage.setItem(ACCIONES, JSON.stringify(acciones));
    },
    changeTransacciones(state, value: { [p:string]: { codigo: string; descripcion: string }}) {
      const transacciones: {[p: string]: transaccion} = {};
/*      for (const e of value) {
        transacciones[e.codigo] = { descripcion: e.descripcion }
      }*/
      state.transacciones = value;
      localStorage.setItem(TRANSACCIONES, JSON.stringify(value));
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
    reglas: state => state.reglasNegocio,
    acciones: state => state.acciones,
    transacciones: state => state.transacciones
  }
})
