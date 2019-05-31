<template>
    <div>
        <Modal v-model="model.isSellingOffModel" :mask-closable="false" title="销假">
            <Form ref="sellingOff" :rules="ruleSellingOff" :model="sellingOff" :label-width="80">
                <FormItem label="销假人">
                    <Input :value="userInfo.username" disabled></Input>
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
                <FormItem label="销假时间" prop="sellingOffTime">
                    <DatePicker
                        style="width:100%;"
                        v-model="sellingOff.sellingOffTime"
                        format="yyyy-MM-dd HH:mm"
                        placeholder="请选择销假时间"
                    ></DatePicker>
                </FormItem>

                <FormItem label="备注" prop="reason">
                    <Input
                        v-model="sellingOff.reason"
                        type="textarea"
                        :autosize="{minRows: 2,maxRows: 5}"
                        placeholder="请填写备注"
                    ></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="model.isSellingOffModel=false">取消</Button>
                <Button type="primary" size="large" @click="handelSubmit('sellingOff')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { addSellingOff } from "api";
    import { transformTime } from "@/public/tools";
    import {mapMutations} from 'vuex'
    export default {
        name: "payRise",
        inject: ["reload"],
        props: {
            model: {
                type: Object,
                require: true
            },
            userInfo: {
                type: Object,
                require: true
            }
        },
        data() {
            return {
                proveName: "",
                sellingOff: {
                    proveFile: {},
                    reason: "",
                    sellingOffTime: ""
                },
                ruleSellingOff: {
                    sellingOffTime: [
                        {
                            required: true,
                            type: "date",
                            message: "请选择销假日期",
                            trigger: "change"
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
              ...mapMutations(['setCountList']),
            handleUploadProve(file) {
                this.proveName = file.name;
                this.sellingOff.proveFile = file;
            },
            handelSubmit(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        let param = new FormData();

                        let newSellingOff = {
                            proveFile: this.sellingOff.proveFile,
                            sellingOffTime: transformTime(
                                this.sellingOff.sellingOffTime
                            ),
                            reason: this.sellingOff.reason
                        };

                        param.append("sellingOff", JSON.stringify(newSellingOff));
                        param.append("id", this.userInfo.id);
                        param.append("proveFile", newSellingOff.proveFile);
                        console.log(this.sellingOff);
                        addSellingOff(param).then(res => {
                            console.log(res);
                            if (res.success) {
                                // this.model.isApplyLeave = false;
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
        }
    };
</script>

<style lang="less" scoped>
</style>