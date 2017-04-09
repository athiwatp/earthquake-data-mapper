// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import * as VueGoogleMaps from 'vue2-google-maps';
import VueResource from 'vue-resource'
import VueMoment from 'vue-moment'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDUsO-wJmc5fYH_Lyp2UyV69pSwe8fmk4I',
    v: '3.27',
    // libraries: 'places', //// If you need to use place input
  }
})
Vue.use(VueResource);
Vue.use(VueMoment)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})

