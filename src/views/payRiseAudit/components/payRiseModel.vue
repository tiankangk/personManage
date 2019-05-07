<template>
    <div>
        <Modal
            v-model="model.isPayRiseModel"
            title="加薪审批"
           
        >
            <Form
                ref="payRiseAudit"
                :rules="rulePayRiseAudit"
                :model="payRiseAuditList"
                :label-width="80"
            >
                <FormItem label="申请人">
                    <Input :value="userInfo.username" disabled></Input>
                </FormItem>
                <FormItem label="加薪理由" prop="reason">
                    <Input
                        v-model="payRiseAuditList.reason"
                        type="textarea"
                        :autosize="{minRows: 2,maxRows: 5}"
                        placeholder="请填写加薪理由"
                    ></Input>
                </FormItem>
            </Form>
             <div slot="footer">
                <Button type="text" size="large" @click="model.isPayRiseModel=false">取消</Button>
                <Button type="primary" size="large" @click="handelSubmit('payRiseAudit')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import {addPayRiseAudit} from 'api';
import {mapMutations} from 'vuex'
    export default {
        name: "payRiseModel",
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
                payRiseAuditList:{
                    reason:''
                },
                rulePayRiseAudit:{
                     reason: [
                        {
                            required: true,
                            message: "请您填写对申请人的评价",
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
                        console.log('test');
                        addPayRiseAudit({
                            userId: this.userInfo.id,
                            reason: this.payRiseAuditList.reason
                        }).then(res => {
                            console.log(res);
                            if (res.success) {
                                // this.model.isEmployeeUp = false;
                                  this.setCountList();
                                 
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