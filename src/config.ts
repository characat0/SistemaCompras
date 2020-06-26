export const BACK_URL = process.env.VUE_APP_BACK_URL;
export const REFRESH_TOKEN = process.env.VUE_APP_LOCALSTORAGE_R_T;
export const ACCESS_TOKEN = process.env.VUE_APP_LOCALSTORAGE_A_T;

const MAYOR_CUANTIA = 'Mayor cuantía', MENOR_CUANTIA = 'Menor cuantía', ORDINARIA = 'Ordinaria';
const MAGNITUD = { MAYOR_CUANTIA, MENOR_CUANTIA, ORDINARIA };

const URGENTE = 'Urgente', NO_URGENTE = 'No urgente';
const URGENCIA = { URGENTE, NO_URGENTE };

const NACIONAL = 'Nacional', INTERNACIONAL = 'Internacional';
const PROCEDENCIA = { NACIONAL, INTERNACIONAL };

const BIEN = 'Bien', SERVICIO = 'Servicio';
const NATURALEZA = { BIEN, SERVICIO };

export const PARAMETROS = { magnitud: MAGNITUD, urgencia: URGENCIA, procedencia: PROCEDENCIA, naturaleza: NATURALEZA };



export const USER_EMAIL = process.env.VUE_APP_USER_EMAIL;
export const USER_PASSWORD = process.env.VUE_APP_USER_PASSWORD;