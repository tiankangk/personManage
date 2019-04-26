<template>
     <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">{{tipContent}}</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import {pickGoodsLogin} from 'api'
import {mapMutations} from 'vuex'
import LoginForm from './components/login-form'
    export default {
        name:'login',
        components:{
            LoginForm
        },
        data() {
            return {
                tipContent: ''
            }
        },
        methods: {
            ...mapMutations(['setUserInfo']),
            /**
             * 页面登录
             */
            handleSubmit({username,password}) {
                console.log(username);
                pickGoodsLogin({ username, password }).then(res =>{
                    console.log(res);
                    if(res.success){
                        this.setUserInfo({id:res.result.BM,mc:res.result.MC});
                        this.$router.push('/entryRegistration')
                    } else {
                        this.tipContent = '用户名或密码不正确'
                    }
                });
            }
        },
    }
</script>

<style lang="less" scoped>
  @import './login.less';
</style>