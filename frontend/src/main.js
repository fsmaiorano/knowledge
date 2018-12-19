import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './bootstrap'
import './msg'
import './axios'
import './mq'

Vue.config.productionTip = false

//TMP
// require('axios').defaults.headers.common['Authorization'] =
//     'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkbDoWJpbyIsImVtYWlsIjoiZnNtYWlvcmFub0BnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTQ1MDYwOTUwLCJleHAiOjE1NDUzMjAxNTB9.-WoZWe1pEkSOHjCXfJsRDa6cOWrGEL_oGDcG3WcTCpQ'

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
