<template>
    <div>
        <Modal v-model="model.isEmployeeUp" :mask-closable="false" title="晋升申请">
            <Form
                ref="employeeUp"
                :rules="ruleEmployeeUp"
                :model="employeeUpList"
                :label-width="80"
            >
                <FormItem label="晋升人">
                    <Input :value="chooseVal.username" disabled></Input>
                </FormItem>

                <FormItem label="晋升职务" prop="job">
                    <Select v-model="employeeUpList.job">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="晋升工资" prop="money">
                    <Input v-model="employeeUpList.money" placeholder="请填写晋升工资"></Input>
                </FormItem>
                <FormItem label="考察期" prop="watchTime">
                    <Input v-model="employeeUpList.watchTime" placeholder="请填写考察期">
                        <span slot="append">月</span>
                    </Input>
                </FormItem>
                <FormItem label="晋升日期" prop="riseTime">
                    <DatePicker
                        type="date"
                        placeholder="请选择晋升的日期"
                        v-model="employeeUpList.riseTime"
                    ></DatePicker>
                </FormItem>
                <FormItem label="晋升理由" prop="reason">
                    <Input
                        v-model="employeeUpList.reason"
                        type="textarea"
                        :autosize="{minRows: 2,maxRows: 5}"
                        placeholder="请填写晋升理由"
                    ></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="model.isEmployeeUp=false">取消</Button>
                <Button type="primary" size="large" @click="handelSubmit('employeeUp')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { addEmployeeUpInfo } from "api";
    import { transformTime } from "@/public/tools";
    export default {
        name: "employeeUp",
        props: {
            model: {
                type: Object,
                require: true
            },
            chooseVal: {
                type: Object,
                require: true
            }
        },
        data() {
            return {
                employeeUpList: {
                    job: "",
                    money: "",
                    riseTime: "",
                    watchTime: "",
                    reason: ""
                },
                ruleEmployeeUp: {
                    job: [
                        {
                            required: true,
                            message: "请选择晋升职务",
                            trigger: "change"
                        }
                    ],
                    money: [
                        {
                            required: true,
                            message: "请填写晋升工资",
                            trigger: "blur"
                        }
                    ],
                    riseTime: [
                        {
                            required: true,
                            type: "date",
                            message: "请选择晋升日期",
                            trigger: "change"
                        }
                    ],
                    watchTime: [
                        { required: true, message: "请填写考察期", trigger: "blur" }
                    ],
                    reason: [
                        {
                            required: true,
                            message: "请填写晋升理由",
                            trigger: "blur"
                        }
                    ]
                }
            };
        },
        methods: {
            handelSubmit(name) {
                console.log(transformTime(this.employeeUpList.riseTime));

                this.$refs[name].validate(valid => {
                    if (valid) {
                        let newEmployeeUpList = { ...this.employeeUpList };
                        newEmployeeUpList.riseTime = transformTime(
                            newEmployeeUpList.riseTime
                        );
                        addEmployeeUpInfo({
                            userId: this.chooseVal.id,
                            employeeUpList: newEmployeeUpList
                        }).then(res => {
                            console.log(res);
                            if (res.success) {
                                this.model.isEmployeeUp = false;
                                this.$Message.success("提交成功");
                            } else {
                                this.$Message.error("提交失败");
                            }
                        });
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
</style>