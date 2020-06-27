import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
  customProperties: true,
  iconfont: 'mdi'
});

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#44aaee',
        secondary: '#424242',
        accent: '#cb82ff',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
});
