import Vue from 'vue';
import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons' 

Vue.component('font-awesome-icon', FontAwesomeIcon) // Register component globally
library.add(fas,faFacebook, faGoogle) // Include needed icons

Vue.use(Vuetify);

const opts = {
    icons: {
        iconfont: Iconfont
    },
  }
const Iconfont = 'mdi' | 'mdiSvg' | 'md' | 'fa' | 'faSvg' | 'fa4';
export default new Vuetify(opts)