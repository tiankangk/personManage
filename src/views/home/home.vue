<template>
    <div class="layout">
        <Layout>
            <div class="left-container">
                <div class="logo-container"></div>
                <Sider
                    ref="side1"
                    hide-trigger
                    collapsible
                    :collapsed-width="78"
                    v-model="isCollapsed"
                >
                    <Menu
                    ref="slideMenu"
                        v-show="!isCollapsed"
                        :open-names="[$route.matched[0].name]"
                        :active-name="$route.name"
                        accordion
                        theme="dark"
                        width="auto"
                    >
                        <Submenu v-for="item in getMenuList" :key="item.name" :name="item.name">
                            <template slot="title">
                                <Icon :type="item.meta.icon"></Icon>
                                {{item.meta.title}}
                            </template>
                            <MenuItem
                                v-for="child in item.children"
                                :key="child.name"
                                :name="child.name"
                                v-if="child.meta.isHide"
                                :to="item.path+(item.path=='/'?'':'/')+child.path"
                            >{{child.meta.title}}</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <div class="collapsed-containter" v-show="isCollapsed">
                    <Dropdown
                        class="dropdown-container"
                        v-for="item in getMenuList"
                        :key="item.name"
                        placement="right"
                    >
                        <a class="dropdown-color" href="javascript:void(0)">
                            <Icon :type="item.meta.icon"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem
                                v-for="child in item.children"
                                :key="child.name"
                                :name="child.name"
                                v-if="child.meta.isHide"
                                @click.native="jump(item.path+(item.path=='/'?'':'/')+child.path)"
                            >{{child.meta.title}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <Layout style="position:relative;">
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon
                        @click.native="collapsedSider"
                        :class="rotateIcon"
                        :style="{margin: '0 20px'}"
                        type="md-menu"
                        size="24"
                    ></Icon>
                    <div class="header-title">人事管理系统</div>
                    <Dropdown class="user-container">
                        <a href="javascript:void(0)">
                            {{getUsername}}
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem @click.native="handleChangePassword">修改密码</DropdownItem>
                            <DropdownItem @click.native="loginOut">退出</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Header>
                <tags-nav :getMenuList="getMenuList"></tags-nav>
                <Content
                    :style="{margin:'10px',padding: '10px', background: '#fff',maxHeight:'90%',overflowY:'scroll'}"
                >
                    <keep-alive v-if="isRouterAlive">
                        <router-view />
                    </keep-alive>
                </Content>
            </Layout>
        </Layout>
        <change-password :changePassword="changePassword"></change-password>
    </div>
</template>
<script>
    import { mapGetters } from "vuex";
    import changePassword from "./components/changePassword";
    import tagsNav from './components/tagsNav.vue'
    export default {
        name: "Home",
        components: {
            changePassword,
            tagsNav
        },
        provide() {
            return {
                reload: this.reload
            };
        },
        data() {
            return {
                isRouterAlive: true,
                isCollapsed: false,
                changePassword: {
                    changePasswordModel: false
                }
            };
        },
        computed: {
            ...mapGetters(["getMenuList", "getUsername"]),
            rotateIcon() {
                return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
            }
        },
        watch:{
            $route(){
                this.$refs.slideMenu.$children.forEach(item =>{
                    item.opened = false;
                });
                this.$nextTick(()=>{
                    this.$refs.slideMenu.updateOpened();
                })
            }
        },
        methods: {
            reload() {
                this.isRouterAlive = false;
                this.$nextTick(() => {
                    this.isRouterAlive = true;
                });
            },
            handleChangePassword() {
                this.changePassword.changePasswordModel = true;
            },
            jump(path) {
                this.$router.push(path);
            },
            loginOut() {
                console.log("clear");
                localStorage.removeItem("mc");
                localStorage.removeItem("userId");
                localStorage.removeItem("username");
                this.$router.push("/login");
            },
            collapsedSider() {
                this.$refs.side1.toggleCollapse();
            }
        },
        mounted() {
            console.log("route", this.$route);
            console.log("getMenuList", this.getMenuList);
        }
    };
</script>
<style lang="less" scoped>
.layout /deep/ .ivu-layout {
    height: 100%;
}
.layout /deep/ .ivu-menu {
    z-index: 8;
}
.collapsed-containter /deep/ .ivu-select-dropdown {
    width: auto;
}
.dropdown-container:hover {
    background: #2d3858;
}
.collapsed-containter {
    width: 78px;
    .dropdown-container {
        width: 100%;
        text-align: center;
        font-size: 30px;
        .dropdown-color {
            color: #fff;
        }
    }
}
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
    height: 100%;
    .left-container {
        background: #515a6e;
        .logo-container {
            height: 64px;
            background-image: url(~assets/images/logo.jpg);
            background-size: 100% 100%;
        }
    }
}
.layout-header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    .header-title {
        font-size: 24px;
    }
    .user-container {
        margin-right: 20px;
    }
}
.layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
}
.menu-icon {
    transition: all 0.3s;
}
.rotate-icon {
    transform: rotate(-90deg);
}
.menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
}
.menu-item i {
    transform: translateX(0px);
    transition: font-size 0.2s ease, transform 0.2s ease;
    vertical-align: middle;
    font-size: 16px;
}
.collapsed-menu span {
    width: 0px;
    transition: width 0.2s ease;
}
.collapsed-menu i {
    transform: translateX(5px);
    transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
}
</style>