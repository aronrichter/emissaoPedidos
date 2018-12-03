import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import { Table } from 'buefy/dist/components/table'
import { Input } from 'buefy/dist/components/input'
import 'buefy/dist/buefy.css'

Vue.use(VueResource);
Vue.component('b-table', Table)
Vue.component('b-input', Input)

new Vue({
  el: '#app',
  render: h => h(App)
})