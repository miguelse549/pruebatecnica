import Vue from 'vue'
import VueRouter from 'vue-router'
import VistaPrincipal from '../views/VistaCasas.vue'
import VistaMiembros from '../views/VistaMiembros.vue'

Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: 'VistaPrincipal',
        component: VistaPrincipal
    },
    {
        path: '/vistamiembros',
        name: 'VistaMiembros',
        component: VistaMiembros,
        props: true
    },

]

const router = new VueRouter({
    routes
})

export default router