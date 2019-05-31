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
                 <FormItem prop="company" label="公司">
                <Cascader
                    v-model="employeeUpList.company"
                    @on-change="handleChangeCompany"
                    :data="companyList"
                    change-on-select
                ></Cascader>
                <!-- <Select
                    v-model="userInfo.company"
                    @on-change="handleChangeCompany(userInfo.company)"
                    placeholder="请选择入职公司"
                >
                    <Option
                        v-for="company in companyList"
                        :key="company.id"
                        :value="company.id"
                    >{{company.name}}</Option>
                </Select>-->
            </FormItem>
            <FormItem prop="part" label="部门">
                <Cascader
                    v-model="employeeUpList.part"
                    @on-change="handleChangeCompany"
                    :data="partList"
                    change-on-select
                ></Cascader>
                <!-- <Select
                    v-model="userInfo.part"
                    @on-change="handleChangeCompany(userInfo.part)"
                    placeholder="请选择部门"
                >
                    <Option v-for="part in partList" :key="part.id" :value="part.id">{{part.name}}</Option>
                </Select>-->
            </FormItem>
            <FormItem prop="post" label="岗位">
                <Cascader
                    v-model="employeeUpList.post"
                    :data="postList"
                      @on-change="handleChangeCompany"
                    change-on-select
                ></Cascader>
                <!-- <Select v-model="userInfo.post" placeholder="请选择岗位">
                    <Option v-for="job in jobList" :key="job.id" :value="job.id">{{job.name}}</Option>
                </Select>-->
            </FormItem>

            <FormItem prop="job" label="职务">
                 <Cascader
                    v-model="employeeUpList.job"
                    :data="jobList"
                    change-on-select
                ></Cascader>
                <!-- <Select v-model="userInfo.job" placeholder="请选择职务">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select> -->
            </FormItem>

                <!-- <FormItem label="晋升职务" prop="job">
                    <Select v-model="employeeUpList.job">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem> -->
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
    import { addEmployeeUpInfo,getSelectCompanyInfor, getSelectChildInfor } from "api";
    import { transformTime,getFormat } from "@/public/tools";
    import {mapMutations} from 'vuex'
    export default {
        name: "employeeUp",
        inject:['reload'],
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
                 companyList: [],
                partList: [],
                postList: [],
                jobList:[],
                employeeUpList: {
                    company:[],
                      part:[],
                        post:[],
                    job: [],
                    money: "",
                    riseTime: "",
                    watchTime: "",
                    reason: ""
                },
                ruleEmployeeUp: {
                    company: [
                        {
                            required: true,
                            type: "array",
                            message: "请选择入职公司",
                            trigger: "change"
                        }
                    ],
                    part: [
                        {
                            required: true,
                            type: "array",
                            message: "请选择部门",
                            trigger: "change"
                        }
                    ],
                    post: [
                        {
                            required: true,
                            type: "array",
                            message: "请选择岗位",
                            trigger: "change"
                        }
                    ],
                    job: [
                        {
                            required: true,
                             type: "array",
                            message: "请选择职务",
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
              ...mapMutations(['setCountList']),
             
                 // 下拉选择公司
            handleChangeCompany(idList) {
                console.log("idList", idList);
                getSelectChildInfor({ id: idList[idList.length - 1] }).then(res => {
                    console.log(res);
                    if (0 in res.result) {
                        if (res.result[0].type == 2) {
                            this.partList = getFormat(res.result,2);
                            this.employeeUpList.part = [];
                             this.employeeUpList.post = [];
                        } else if (res.result[0].type == 3) {
                            this.postList = getFormat(res.result,3);
                              this.employeeUpList.post = [];
                               this.employeeUpList.job = [];
                        }else if (res.result[0].type == 4) {
                            this.jobList =getFormat(res.result,4);
                              this.employeeUpList.job = [];
                        }
                    }
                });
            },
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
                                  this.reload();
                                // this.model.isEmployeeUp = false;
                                       this.setCountList();
                                this.$Message.success("提交成功");
                            } else {
                                this.$Message.error("提交失败");
                            }
                        });
                    }
                });
            }
        },
        mounted(){
             getSelectCompanyInfor({ type: 1 }).then(res => {
                    if (0 in res.result) {
                        this.companyList = getFormat(res.result,1);
                    }
                });
        }
    };
</script>

<style lang="less" scoped>
</style>