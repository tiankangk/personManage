import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/home/home'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('views/login/login')
        },
        {
            path: '/',
            name: '_home',
            redirect: '/entryRegistration',
            meta: {
                title: '入职登记',
                icon: 'ios-clipboard-outline'
            },
            component: Home,
            children: [
                {
                    path: 'entryRegistration',
                    name: 'entryRegistration',
                    meta: {
                        title: '入职登记',
                        isHide: true
                    },
                    component: () => import('views/entryRegistration/entryRegistration')
                },
                {
                    path: 'entryRegistrationList',
                    name: 'entryRegistrationList',
                    meta: {
                        title: '人员管理',
                        isHide: true
                    },
                    component: () => import('views/entryRegistration/entryRegistrationList')
                }
            ]
        },
        {
            path: '/auditsManage',
            name: 'auditsManage',
            meta: {
                title: '审核管理',
                icon: 'ios-clipboard-outline'
            },
            component: Home,
            children: [
                {
                    path: 'employeeUpAudit',
                    name: 'employeeUpAudit',
                    meta: {
                        title: '晋升审核',
                        isHide: true
                    },
                    component: () => import('views/employeeUpAudit/employeeUpAudit')
                },
                {
                    path: 'payRiseAudit',
                    name: 'payRiseAudit',
                    meta: {
                        title: '加薪审核',
                        isHide: true
                    },
                    component: () => import('views/payRiseAudit/payRiseAudit')
                },
                {
                    path: 'applyLeaveAudit',
                    name: 'applyLeaveAudit',
                    meta: {
                        title: '请假审核',
                        isHide: true
                    },
                    component: () => import('views/applyLeaveAudit/applyLeaveAudit')
                },
                {
                    path: 'turnFormalAudit',
                    name: 'turnFormalAudit',
                    meta: {
                        title: '转正审核',
                        isHide: true
                    },
                    component: () => import('views/turnFormalAudit/turnFormalAudit')
                },

                {
                    path: 'sellingOff',
                    name: 'sellingOff',
                    meta: {
                        title: '销假管理',
                        isHide: true
                    },
                    component: () => import('views/sellingOff/sellingOff')
                }

            ]
        },
        {
            path: '/partManage',
            name: 'partManage',
            meta: {
                title: '部门管理',
                icon: 'ios-clipboard-outline'
            },
            component: Home,
            children: [
                {
                    path: 'partManage',
                    name: 'partManage',
                    meta: {
                        title: '部门管理',
                        isHide: true
                    },
                    component: () => import('views/partManage/partManage')
                }

            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    let username = localStorage.getItem('userId');
    console.log(username);
    if (username) {
        next();
    } else {
        if (to.path !== '/login') {
            next({ path: '/login' });
        } else {
            next();
        }
    }
})
export default router
