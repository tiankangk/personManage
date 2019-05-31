<template>
    <div>
        <Modal
            v-model="model.isTurnFormalModel"
            title="转正审批"
           
        >
            <Form
                ref="turnFormalAudit"
                :rules="ruleTurnFormalAudit"
                :model="turnFormalAudit"
                :label-width="80"
            >
                <FormItem label="申请人">
                    <Input :value="userInfo.username" disabled></Input>
                </FormItem>
                <FormItem label="备注" prop="reason">
                    <Input
                        v-model="turnFormalAudit.reason"
                        type="textarea"
                        :autosize="{minRows: 2,maxRows: 5}"
                        placeholder="请填写备注"
                    ></Input>
                </FormItem>
            </Form>
             <div slot="footer">
                <Button type="text" size="large" @click="model.isTurnFormalModel=false">取消</Button>
                <Button type="primary" size="large" @click="handelSubmit('turnFormalAudit')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import {addTurnFormalAudit} from 'api';
import {mapMutations} from 'vuex'
    export default {
        name: "turnFormalModel",
         inject:['reload'],
        props: {
            model: {
                type: Object,
                require: true
            },
            userInfo:{
                type:Object,
                require:true
            }
        },
        data() {
            return {
                turnFormalAudit:{
                    reason:''
                },
                ruleTurnFormalAudit:{
                     reason: [
                        {
                            required: true,
                            message: "请您填写备注",
                            trigger: "blur"
                        }
                    ],
                }
            };
        },
        methods: {
            ...mapMutations(['setCountList']),
            handelSubmit(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        
                        addTurnFormalAudit({
                            id: this.userInfo.id,
                            reason: this.turnFormalAudit.reason
                        }).then(res => {
                            console.log(res);
                            if (res.success) {
                                this.setCountList();
                                // this.model.isEmployeeUp = false;
                                this.reload();
                                this.$Message.success("提交成功");
                            } else {
                                this.$Message.error("提交失败");
                            }
                        });
                    }
                });
            }
        },
    };
</script>

<style lang="less" scoped>
</style>