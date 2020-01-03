import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', name: 'index', component: () => import('../examples/templete-editor-demo') },
    { path: '/init', name: 'init', component: () => import('../examples/init') },
    { path: '/loc', name: 'local', component: () => import('../examples/localytest') },
  ],
  mode: 'history',
})
