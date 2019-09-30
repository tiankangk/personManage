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
        sessionStorage.setItem('rsusername', userInfo.mc);
        sessionStorage.setItem('rsuserId', userInfo.id);
    },
    setCountList(state){
        getUnAuditCount().then(res => {
            console.log('getUnAuditCount',res);
            state.countList = res;
        });
    }
}

const getters = {
    getUsername: () => sessionStorage.getItem('rsusername'),
    getUserId: () => sessionStorage.getItem('rsuserId'),
    getMenuList: () => router.options.routes.filter(item => ( item.path !== '/login' )),
    getCountList:(state) => state.countList
}

export default new Vuex.Store({
    state,
    mutations,
    getters
}) 