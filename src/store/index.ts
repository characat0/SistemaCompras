import Vue from 'vue'
import Vuex from 'vuex'
import {cuantias, P_CUANTIAS} from "@/store/parametros";
import {REGLAS, reglasNegocio} from "@/store/reglas";
import {PRODUCT_ROWS, productRows} from "@/store/productos";

const LOGGED = 'LOGGED', NACIONALIDAD = 'NACIONALIDAD';

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
