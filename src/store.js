import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        my_employee: 'adsgda',
    },
    mutations: {
        setMyEmployee(state, my_employee) {
            state.my_employee = my_employee
        }
    }
})
