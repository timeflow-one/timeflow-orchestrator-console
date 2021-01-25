import '@mdi/font/css/materialdesignicons.css'

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'
import _ru from '@/locales/ru.json'
import __ru from 'vuetify/src/locale/ru'
import __en from 'vuetify/src/locale/en'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#2358a3',
        secondary: '#ed2527',
        accent: colors.deepPurple.lighten2,
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        toolbar_border: colors.grey.lighten2,
        inactive: '#FFEDF3',
        enabled: colors.green.lighten1,
        disabled: colors.grey.lighten4
      }
    }
  },
  lang: {
    locales: {
      ru: { ..._ru, ...__ru },
      en: { ...__en }
    },
    current: 'ru'
  }
})
