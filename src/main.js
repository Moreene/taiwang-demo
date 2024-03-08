import { createApp } from 'vue';
import { createPinia } from 'pinia';

import './assets/all.scss';

import App from './App.vue';
import router from './router';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';

// VeeValidate
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import * as AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

Object.keys(AllRules).forEach(rule => {
    defineRule(rule, AllRules[rule]);
});

configure({
    generateMessage: localize({ zh_TW: zhTW }),
    validateOnInput: false,
});
setLocale('zh_TW');

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component('VField', Field);
app.component('VForm', Form);
app.component('ErrorMessage', ErrorMessage);
app.component('VueLoading', Loading)

app.mount('#app');