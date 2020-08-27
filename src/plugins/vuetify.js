import Vue from 'vue';
import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons' 

const locales = {
  en: require('vuetify/es5/locale/en'),
  fr: require('vuetify/es5/locale/fr')
}

const current = navigator.language.split('-')[0]

Vue.component('font-awesome-icon', FontAwesomeIcon) // Register component globally
library.add(fas,faFacebook, faGoogle) // Include needed icons

Vue.use(Vuetify);

const opts = {
    icons: {
        iconfont: Iconfont
    },
  }
const Iconfont = 'mdi' | 'mdiSvg' | 'md' | 'fa' | 'faSvg' | 'fa4';
export default new Vuetify({
  opts,
  locales,
  current,
  theme: {
    dark: false,
    themes: {
      dark: {
        secondaryColor: "#ecebeb",
        background: '#fff',
        primary: '#1689E7',
        accent: '#4CBB99',
        secondary: '#7BC6FF',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252'
      },
      light: {
        mainColor: '#32BCC3',
        primaryColor:"#f3f3f3",
        background: '#f7f7f7',
        primary: '#1689E7',
        accent: '#4CBB99',
        secondary: '#7BC6FF',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252',
      }
    }
  }
})