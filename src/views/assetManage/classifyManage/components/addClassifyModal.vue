<template>
    <div>
        <Modal v-model="modal.isAddClassify" @on-visible-change="modalChange" title="添加分类">
            <Form ref="classifyInfo" :rules="ruleClassifyInfo" :model="classifyInfo" :label-width="80">
                <FormItem label="分类名称" prop="name">
                    <Input v-model="classifyInfo.name" placeholder="请填写分类名称"></Input>
                </FormItem>
            </Form>

            <div slot="footer">
                <Button type="text" size="large" @click="modal.isAddClassify=false">取消</Button>
                <Button type="primary" size="large" @click="handelSubmit('classifyInfo')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { addAssetClassify } from "api";
    export default {
        name: "addClassifyModal",
        inject: ["reload"],
        props: {
            modal: {
                type: Object,
                require: true
            },
            classifyInfo:{
                type: Object,
                require: true
            }
        },
        data() {
            return {
               
                ruleClassifyInfo: {
                    name: [
                        {
                            required: true,
                            message: "请输入分类名称",
                            trigger: "blur"
                        }
                    ]
                }
            };
        },
        methods: {
            modalChange(val) {
                if (!val) {
                    console.log(val);
                    this.$refs.classifyInfo.resetFields();
                }
              
            },
            handelSubmit(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        addAssetClassify(this.classifyInfo).then(res => {
                            console.log(res);
                            if (res.success) {
                                // this.reload();
                                this.$emit('updateClassify')
                                 this.modal.isAddClassify = false;
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