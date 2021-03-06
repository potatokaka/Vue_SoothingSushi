import { createApp } from 'vue'
// Atropos
import 'atropos/atropos.css'
// Bootstrap
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// Vee Validate
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
// import { localize, setLocale } from '@vee-validate/i18n'
// import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

import App from './App.vue'
import router from './router'

// Vee Validate
defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
configure({
  //   generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: false // 當輸入任何內容直接進行驗證
})
// setLocale('zh_TW')

const app = createApp(App)
app.use(router)
app.use(VueAxios, axios)

// Vee Validate 註冊元件
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)

app.mount('#app')
