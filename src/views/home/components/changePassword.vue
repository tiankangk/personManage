<template>
    <div class="change-password">
        <Drawer
            title="修改密码"
            v-model="changePassword.changePasswordModel"
            width="400"
            :mask-closable="false"
            :styles="styles"
        >
            <Form ref="formCustom" :model="userInfor" :rules="ruleCustom" :label-width="80">
                <FormItem label="用户名">
                    <Input type="text" :value="getUsername" disabled></Input>
                </FormItem>
                <FormItem label="原始密码" prop="oldPasswd">
                    <Input type="password" v-model="userInfor.oldPasswd"></Input>
                </FormItem>
                <FormItem label="新密码" prop="newPasswd">
                    <Input type="password" v-model="userInfor.newPasswd"></Input>
                </FormItem>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="closeDrawer">关闭</Button>
                <Button type="primary" @click="handleSubmitForm('formCustom')">提交</Button>
            </div>
        </Drawer>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import { changePassword } from "api";
    export default {
        name: "changePassword",
        props: {
            changePassword: {
                type: Object,
                require: true
            }
        },
        computed: {
            ...mapGetters(["getUsername"])
        },
        data() {
            return {
                userInfor: {
                    userId: localStorage.getItem("userId"),
                    oldPasswd: "",
                    newPasswd: ""
                },
                ruleCustom: {
                    oldPasswd: [
                        {
                            required: true,
                            message: "请输入原始密码",
                            trigger: "blur"
                        }
                    ],
                    newPasswd: [
                        { required: true, message: "请输入新密码", trigger: "blur" }
                    ]
                },
                styles: {
                    height: "calc(100% - 55px)",
                    overflow: "auto",
                    paddingBottom: "53px",
                    position: "static"
                }
            };
        },
        methods: {
            handleSubmitForm(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        changePassword(this.userInfor).then(res => {
                            console.log(res);
                            if (res.result === 1) {
                                // this.$Message.success("修改成功");
                                this.$Modal.success({
                                    title: "提示",
                                    content: "修改成功，您将重新登录",
                                    onOk: () => {
                                        localStorage.removeItem("mc");
                                        localStorage.removeItem("userId");
                                        localStorage.removeItem("username");
                                        this.$router.push("/login");
                                    }
                                });
                            } else if (res.result === 2) {
                                this.$Message.warning("原始密码不正确");
                            } else {
                                this.$Message.error("修改失败");
                            }
                        });
                    }
                });
            },
            closeDrawer() {
                this.changePassword.changePasswordModel = false;
            }
        }
    };
</script>

<style lang="less" scoped>
.demo-drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
}
</style>