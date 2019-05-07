<template>
    <div>
        <Modal v-model="modal.isAddCompany" @on-visible-change="modalChange" title="添加分类">
            <Form :label-width="80">
                <FormItem v-if="parantInfo.name" label="父级的名称">
                    <Input :value="parantInfo.name" disabled></Input>
                </FormItem>
            </Form>
            <Form ref="companyInfo" :rules="ruleCompanyInfo" :model="companyInfo" :label-width="80">
                <FormItem label="名称" prop="companyName">
                    <Input v-model="companyInfo.companyName"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="modal.isAddCompany=false">取消</Button>
                <Button type="primary" size="large" @click="handelSubmit('companyInfo')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { addcompany } from "api";
    export default {
        name: "addCompanyModal",
        inject: ["reload"],
        props: {
            modal: {
                type: Object,
                require: true
            },
            parantInfo: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                companyInfo: {
                    companyName: ""
                },
                ruleCompanyInfo: {
                    companyName: [
                        {
                            required: true,
                            message: "请输入名称",
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
                    this.$refs.companyInfo.resetFields();
                }
                if (
                    val &&
                    "btn" in this.parantInfo &&
                    this.parantInfo.btn === "edit"
                ) {
                    this.companyInfo.companyName = this.parantInfo.name;
                }
            },
            handelSubmit(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        addcompany({
                            name: this.companyInfo.companyName,
                            parantInfo: this.parantInfo
                        }).then(res => {
                            console.log(res);
                            if (res.success) {
                                this.reload();
                                 this.modal.isAddCompany = false;
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