import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);


export default new Vuex.Store({
    state:{
        login: 0,
        counter: 0,
        user: "Guest"

    },
    mutations: { //synchronous way to update data
        setLogin(state, payload){
            state.login = payload;
        },
        setUser(state, payload){
            state.user = payload;
        }
    },
    actions: {},
    modules: {},
    getters: {
        getLogin(state){
            return state.login;
        },
        getMessage(state){
            return state.message;
        }
    }
})