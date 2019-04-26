<template>
    <div>
        <Modal v-model="model.isApplyLeave" :mask-closable="false" title="请假申请">
            <Form ref="applyLeave" :rules="ruleApplyLeave" :model="applyLeave" :label-width="80">
                <FormItem label="申请人">
                    <Input :value="chooseVal.username" disabled></Input>
                </FormItem>
                <FormItem label="所在部门" prop="part">
                    <Select v-model="applyLeave.part">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="岗位职务" prop="post">
                    <Select v-model="applyLeave.post">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="请假类型" prop="type">
                    <Select v-model="applyLeave.type">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Row>
                        <Col :span="6">
                            <Upload
                                :show-upload-list="false"
                                :before-upload="handleUploadProve"
                                action="//jsonplaceholder.typicode.com/posts/"
                            >
                                <Button icon="ios-cloud-upload-outline">上传证明</Button>
                            </Upload>
                        </Col>
                        <Col :span="18">
                            <Input disabled type="text" v-model="proveName"></Input>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem  label="请假时间" prop="leaveTime">
                    <DatePicker
                    style="width:100%;"
                        type="datetimerange"
                        v-model="applyLeave.leaveTime"
                        format="yyyy-MM-dd HH:mm"
                        placeholder="请选择请假时间"
                    ></DatePicker>
                </FormItem>
                <FormItem label="请假天数" prop="days">
                    <Input v-model="applyLeave.days" placeholder="请填写请假天数"></Input>
                </FormItem>
                
                <FormItem label="请假理由" prop="reason">
                    <Input
                        v-model="applyLeave.reason"
                        type="textarea"
                        :autosize="{minRows: 2,maxRows: 5}"
                        placeholder="请填写晋升理由"
                    ></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="model.isApplyLeave=false">取消</Button>
                <Button type="primary" size="large" @click="handelSubmit('applyLeave')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { addApplyLeave } from "api";
    import { transformTime } from "@/public/tools";
    export default {
        name: "payRise",
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
                proveName: "",
                applyLeave: {
                    proveFile: {},
                    part: "",
                    post: "",
                    type: 0,
                    days: "",
                    reason: "",
                    leaveTime: []
                },
                ruleApplyLeave: {
                    part: [
                        {
                            required: true,
                            message: "请选择部门",
                            trigger: "change"
                        }
                    ],
                    post: [
                        {
                            required: true,
                            message: "请选择职务",
                            trigger: "change"
                        }
                    ],
                    type: [
                        {
                            required: true,
                            message: "请选择类型",
                            trigger: "change"
                        }
                    ],
                    days: [
                        {
                            required: true,
                            message: "请填写请假时间",
                            trigger: "blur"
                        }
                    ],
                    leaveTime: [
                        {
                            required: true,
                            type: "array",
                            fields: {
                                0: {
                                    required: true,
                                    type: "date",
                                    message: "请选择全天/时间范围",
                                    trigger: "change"
                                },
                                1: {
                                    required: true,
                                    type: "date",
                                    message: "请选择全天/时间范围",
                                    trigger: "change"
                                }
                            }
                        }
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
            handleUploadProve(file) {
                this.proveName = file.name;
                this.applyLeave.proveFile = file;
            },
            handelSubmit(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        let param = new FormData();

                        let newApplyLeave = {
                            proveFile: this.applyLeave.proveFile,
                            part: this.applyLeave.part,
                            post: this.applyLeave.post,
                            type: this.applyLeave.type,
                            days: this.applyLeave.days,
                            reason: this.applyLeave.reason,
                            leaveTime: [
                                transformTime(this.applyLeave.leaveTime[0]),
                                transformTime(this.applyLeave.leaveTime[1])
                            ]
                        };

                        param.append("applyLeave", JSON.stringify(newApplyLeave));
                        param.append("userId", this.chooseVal.id);
                        param.append("proveFile", newApplyLeave.proveFile);
                        console.log(this.applyLeave);
                        addApplyLeave(param).then(res => {
                            console.log(res);
                            if (res.success) {
                                this.model.isApplyLeave = false;
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