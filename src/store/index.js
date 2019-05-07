import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import {getUnAuditCount} from 'api'

Vue.use(Vuex)

const state = {
    username: '',
    userId: '',
    countList:{}
}

const mutations = {
    setUserInfo(state, userInfo) {
        console.log(userInfo);
        state.username = userInfo.mc;
        state.userId = userInfo.id;
        localStorage.setItem('username', userInfo.mc);
        localStorage.setItem('userId', userInfo.id);
    },
    setCountList(state){
        getUnAuditCount().then(res => {
            console.log('getUnAuditCount',res);
            state.countList = res;
        });
    }
}

const getters = {
    getUsername: () => localStorage.getItem('username'),
    getUserId: () => localStorage.getItem('userId'),
    getMenuList: () => router.options.routes.filter(item => ( item.path !== '/login' )),
    getCountList:(state) => state.countList
}

export default new Vuex.Store({
    state,
    mutations,
    getters
}) 