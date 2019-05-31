<template>
    <div>
        <Modal v-model="modal.isAddCompany" @on-visible-change="modalChange" title="添加资料名称">
            <Form ref="companyInfo" :rules="ruleCompanyInfo" :model="companyInfo" :label-width="80">
                <FormItem v-if="parantInfo.name" label="父级的名称">
                    <Input :value="parantInfo.name" disabled></Input>
                </FormItem>
                <FormItem label="名称" prop="companyName">
                    <Input v-model="companyInfo.companyName" placeholder="请填写名称"></Input>
                </FormItem>
                <!-- <FormItem prop="category" label="类型">
                    <Select v-model="companyInfo.category" placeholder="请选择类型">
                        <Option
                            v-for="category in categoryList"
                            :key="category.value"
                            :value="category.value"
                        >{{category.label}}</Option>
                    </Select>
                </FormItem> -->
            </Form>

            <div slot="footer">
                <Button type="text" size="large" @click="modal.isAddCompany=false">取消</Button>
                <Button type="primary" size="large" @click="handelSubmit('companyInfo')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { addAssetName } from "api";
    export default {
        name: "addClassifyModal",
        inject: ["reload"],
        props: {
            modal: {
                type: Object,
                require: true
            },
            parantInfo: {
                type: Object,
                required: true
            },
            chooseClassifyVal:{
                type: Object,
                required: true
            }
        },
        data() {
            return {
                companyInfo: {
                    companyName: "",
                    // category: ''
                },
                ruleCompanyInfo: {
                    companyName: [
                        {
                            required: true,
                            message: "请输入名称",
                            trigger: "blur"
                        }
                    ],
                    // category: [
                    //     {
                    //         required: true,
                    //         type: "number",
                    //         message: "请选择类型",
                    //         trigger: "change"
                    //     }
                    // ]
                },
                // categoryList: [
                //     {
                //         value: 1,
                //         label: "资产分类"
                //     },
                //     {
                //         value: 2,
                //         label: "资料名称"
                //     }
                // ]
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
                    this.companyInfo.category = this.parantInfo.category;
                }
            },
            handelSubmit(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        addAssetName({
                            name: this.companyInfo.companyName,
                            // category:this.companyInfo.category,
                            chooseClassifyVal:this.chooseClassifyVal,
                            parantInfo: this.parantInfo
                        }).then(res => {
                            console.log(res);
                            if (res.success) {
                                // this.reload();
                                this.$emit('updateAssetName');
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