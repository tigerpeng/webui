import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0,
        offline:0
    },
    mutations: {
        increment (state) {
            state.count++
        },
        offline(state){
          state.offline=-1
        },
        online(state){
          state.offline=1
        },
    }
})
