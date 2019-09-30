<template>
    <div>
        <Modal
            v-model="model.isApplyLeaveModel"
            title="请假审批"
           
        >
            <Form
                ref="applyLeaveAudit"
                :rules="ruleApplyLeaveAudit"
                :model="applyLeaveAudit"
                :label-width="80"
            >
                <FormItem label="申请人">
                    <Input :value="userInfo.username" disabled></Input>
                </FormItem>
                <FormItem label="备注" prop="reason">
                    <Input
                        v-model="applyLeaveAudit.reason"
                        type="textarea"
                        :autosize="{minRows: 2,maxRows: 5}"
                        placeholder="请填写备注"
                    ></Input>
                </FormItem>
            </Form>
             <div slot="footer">
                <Button type="text" size="large" @click="model.isApplyLeaveModel=false">取消</Button>
                <Button type="primary" size="large" @click="handleSubmit('applyLeaveAudit')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import {addApplyLeaveAudit} from 'api';
import {mapMutations} from 'vuex'
    export default {
        name: "applyLeaveModel",
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
                applyLeaveAudit:{
                    reason:''
                },
                ruleApplyLeaveAudit:{
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
            handleSubmit(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        addApplyLeaveAudit({
                            id: this.userInfo.id,
                            reason: this.applyLeaveAudit.reason
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