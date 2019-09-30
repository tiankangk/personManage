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
                icon: 'icon-register'
                // icon: 'ios-clipboard-outline'
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
                icon: 'icon-comment-verify'
                // icon: 'ios-clipboard-outline'
                
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
                    component: () => import('views/auditManage/employeeUpAudit/employeeUpAudit')
                },
                {
                    path: 'payRiseAudit',
                    name: 'payRiseAudit',
                    meta: {
                        title: '加薪审核',
                        isHide: true
                    },
                    component: () => import('views/auditManage/payRiseAudit/payRiseAudit')
                },
                {
                    path: 'applyLeaveAudit',
                    name: 'applyLeaveAudit',
                    meta: {
                        title: '请假审核',
                        isHide: true
                    },
                    component: () => import('views/auditManage/applyLeaveAudit/applyLeaveAudit')
                },
                {
                    path: 'turnFormalAudit',
                    name: 'turnFormalAudit',
                    meta: {
                        title: '转正审核',
                        isHide: true
                    },
                    component: () => import('views/auditManage/turnFormalAudit/turnFormalAudit')
                },

                {
                    path: 'sellingOff',
                    name: 'sellingOff',
                    meta: {
                        title: '销假管理',
                        isHide: true
                    },
                    component: () => import('views/auditManage/sellingOff/sellingOff')
                }

            ]
        },
        {
            path: '/assetManage',
            name: 'assetManage',
            meta: {
                title: '资产管理',
                icon: 'icon-Assets'
                // icon: 'ios-clipboard-outline'
            },
            component: Home,
            children: [
                {
                    path: 'assetInfoManage',
                    name: 'assetInfoManage',
                    meta: {
                        title: '资产信息管理',
                        isHide: true
                    },
                    component: () => import('views/assetManage/assetInfoManage/assetInfoManage')
                },
                {
                    path: 'classifyManage',
                    name: 'classifyManage',
                    meta: {
                        title: '资产分类管理',
                        isHide: true
                    },
                    component: () => import('views/assetManage/classifyManage/classifyManage')
                },
                {
                    path: 'getAsset',
                    name: 'getAsset',
                    meta: {
                        title: '资产申领管理',
                        isHide: true
                    },
                    component: () => import('views/getAsset/getAsset')
                },
                {
                    path: 'harmAsset',
                    name: 'harmAsset',
                    meta: {
                        title: '资产报损管理',
                        isHide: true
                    },
                    component: () => import('views/harmAsset/harmAsset')
                }
            ]
        },
        {
            path: '/partManage',
            name: 'partManage',
            meta: {
                title: '部门管理',
                icon: 'icon-department'
                // icon: 'ios-clipboard-outline'
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
    let username = sessionStorage.getItem('rsuserId');
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
