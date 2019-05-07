<template>
    <div>
        <Modal v-model="model.isTurnFormal" :mask-closable="false" title="转正申请">
            <Form ref="turnFormal" :rules="ruleTurnFormal" :model="turnFormal" :label-width="80">
                <FormItem label="申请人">
                    <Input :value="chooseVal.username" disabled></Input>
                </FormItem>
                <FormItem label="转正日期" prop="turnTime">
                    <DatePicker type="date" placeholder="请选择转正的日期" v-model="turnFormal.turnTime"></DatePicker>
                </FormItem>
                <FormItem>
                    <Row>
                        <Col :span="6">
                            <Upload
                                :show-upload-list="false"
                                :before-upload="handleUploadPic"
                                action="//jsonplaceholder.typicode.com/posts/"
                            >
                                <Button icon="ios-cloud-upload-outline">上传转正表</Button>
                            </Upload>
                        </Col>
                        <Col :span="18">
                            <Input disabled type="text" v-model="picName"></Input>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="model.isTurnFormal=false">取消</Button>
                <Button type="primary" size="large" @click="handelSubmit('turnFormal')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { addTurnFormal } from "api";
    import { transformTime } from "@/public/tools";
    import {mapMutations} from 'vuex'
    export default {
        name: "turnFormal",
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
                picName: "",
                turnFormal: {
                    turnTime: "",
                    picFile: ""
                },
                ruleTurnFormal: {
                    turnTime: [
                        {
                            required: true,
                            type: "date",
                            message: "请选择转正日期",
                            trigger: "change"
                        }
                    ]
                }
            };
        },
        methods: {
               ...mapMutations(['setCountList']),
            handleUploadPic(file) {
                this.picName = file.name;
                this.turnFormal.picFile = file;
            },
            handelSubmit(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        let param = new FormData();

                        let newTurnFormal = {
                            ...this.turnFormal
                        };
                        newTurnFormal.turnTime = transformTime(
                            newTurnFormal.turnTime
                        );
                        param.append("turnFormal", JSON.stringify(newTurnFormal));
                        param.append("userId", this.chooseVal.id);
                        param.append("picFile", newTurnFormal.picFile);
                        addTurnFormal(param).then(res => {
                            console.log(res);
                            if (res.success) {
                                // this.model.isTurnFormal = false;
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