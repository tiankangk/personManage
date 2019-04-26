import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

const state = {
    username: '',
    userId: ''
}

const mutations = {
    setUserInfo(state, userInfo) {
        console.log(userInfo);
        state.username = userInfo.mc;
        state.userId = userInfo.id;
        localStorage.setItem('username', userInfo.mc);
        localStorage.setItem('userId', userInfo.id);
    }
}

const getters = {
    getUsername: () => localStorage.getItem('username'),
    getUserId: () => localStorage.getItem('userId'),
    getMenuList: () => router.options.routes.filter(item => ( item.path !== '/login' ))
}

export default new Vuex.Store({
    state,
    mutations,
    getters
}) 