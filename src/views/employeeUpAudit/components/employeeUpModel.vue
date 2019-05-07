<template>
    <div>
        <Modal
            v-model="model.isAuditModel"
            title="晋升审批"
           
        >
            <Form
                ref="employeeUpAudit"
                :rules="ruleEmployeeUpAudit"
                :model="employeeUpAuditList"
                :label-width="80"
            >
                <FormItem label="申请人">
                    <Input :value="userInfo.username" disabled></Input>
                </FormItem>
                <FormItem label="晋升理由" prop="reason">
                    <Input
                        v-model="employeeUpAuditList.reason"
                        type="textarea"
                        :autosize="{minRows: 2,maxRows: 5}"
                        placeholder="请填写晋升理由"
                    ></Input>
                </FormItem>
            </Form>
             <div slot="footer">
                <Button type="text" size="large" @click="model.isAuditModel=false">取消</Button>
                <Button type="primary" size="large" @click="handelSubmit('employeeUpAudit')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import {addEmployeeUpAudit} from 'api';
import {mapMutations} from 'vuex'
    export default {
        name: "employeeUpModel",
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
                employeeUpAuditList:{
                    reason:''
                },
                ruleEmployeeUpAudit:{
                     reason: [
                        {
                            required: true,
                            message: "请您填写对晋升人的评价",
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
                        
                        addEmployeeUpAudit({
                            userId: this.userInfo.id,
                            reason: this.employeeUpAuditList.reason
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