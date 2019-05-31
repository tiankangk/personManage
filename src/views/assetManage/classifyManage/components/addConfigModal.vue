<template>
    <div>
        <Modal v-model="modal.isAddConfig" @on-visible-change="modalChange" title="添加配置">
            <Form ref="configInfo" :rules="ruleConfigInfo" :model="configInfo" :label-width="80">
                <FormItem label="配置名称" prop="name">
                    <Input v-model="configInfo.name" placeholder="请填写配置名称"></Input>
                </FormItem>
            </Form>

            <div slot="footer">
                <Button type="text" size="large" @click="modal.isAddConfig=false">取消</Button>
                <Button type="primary" size="large" @click="handelSubmit('configInfo')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { addAssetConfig } from "api";
    export default {
        name: "addConfigModal",
        inject: ["reload"],
        props: {
            modal: {
                type: Object,
                require: true
            },
            configInfo:{
                type: Object,
                require: true
            },
            chooseName:{
                required: true
            }
        },
        data() {
            return {
               
                ruleConfigInfo: {
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
                    this.$refs.configInfo.resetFields();
                }
              
            },
            handelSubmit(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        addAssetConfig({chooseName:this.chooseName,configInfo:this.configInfo}).then(res => {
                            console.log(res);
                            if (res.success) {
                                // this.reload();
                                 this.modal.isAddConfig = false;
                                this.$emit('updateConfig');
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