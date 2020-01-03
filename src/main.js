// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '../router'
import VueRouter from 'vue-router';
/*import App from './components/fs-products-show-hor-link/fs-products-show-hor-link-tpl'*/
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import test from '../examples/test'
import WbfcVsTplEditor from '../index'

window.Vue = Vue;

Vue.use(router);
Vue.use(ElementUI);

Vue.use(WbfcVsTplEditor, {
  components: {
    test
  }
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
