<template>
    <Form ref="addressInfo" :model="addressInfo" :label-width="80" :rules="addressValidate">
        <FormItem label="家庭地址">
            <Row :gutter="16">
                <Col span="7">
                    <FormItem prop="familyAddress">
                        <el-cascader
                         placeholder="请选择所在的区域"
                            style="width:100%;"
                            size="small"
                            :options="familyOption"
                            v-model="addressInfo.familyAddress"
                        ></el-cascader>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem prop="familyDetailAddress">
                        <Input
                            type="text"
                            v-model="addressInfo.familyDetailAddress"
                            placeholder="请输入家庭详细地址"
                        ></Input>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem prop="familyCode">
                        <Input type="text" v-model="addressInfo.familyCode" placeholder="请输入邮政编码"></Input>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="户籍地址">
            <Row :gutter="16">
                <Col span="7">
                    <FormItem prop="houseAddress">
                        <el-cascader
                          placeholder="请选择所在的区域"
                            style="width:100%;"
                            size="small"
                            :options="familyOption"
                            v-model="addressInfo.houseAddress"
                        ></el-cascader>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem prop="houseDetailAddress">
                        <Input
                            type="text"
                            v-model="addressInfo.houseDetailAddress"
                            placeholder="请输入家庭详细地址"
                        ></Input>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem prop="houseCode">
                        <Input type="text" v-model="addressInfo.houseCode" placeholder="请输入邮政编码"></Input>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="现地址">
            <Row :gutter="16">
                <Col span="7">
                    <FormItem prop="nowAddress">
                        <el-cascader
                          placeholder="请选择所在的区域"
                            style="width:100%;"
                            size="small"
                            :options="familyOption"
                            v-model="addressInfo.nowAddress"
                        ></el-cascader>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem prop="nowDetailAddress">
                        <Input
                            type="text"
                            v-model="addressInfo.nowDetailAddress"
                            placeholder="请输入家庭详细地址"
                        ></Input>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem prop="nowCode">
                        <Input type="text" v-model="addressInfo.nowCode" placeholder="请输入邮政编码"></Input>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
    </Form>
</template>

<script>
    import { regionData } from "element-china-area-data";
    export default {
        name: "addressInfo",
        props: {
            addressInfo: {
                type: Object,
                required: true
            }
        },
        data() {
            const validateCode = (rule, value, callback) => {
                let reg = /^[1-9][0-9]{5}$/;
                if (value === "") {
                    callback(new Error("请输入邮政编码"));
                } else {
                    if (!reg.test(value)) {
                        callback(new Error("邮政编码格式不正确"));
                    }
                    callback();
                }
            };
            return {
                familyOption: regionData,
                addressValidate: {
                    familyAddress: [
                        {
                            required: true,
                            type: "array",
                            message: "请选择家庭地址",
                            trigger: "change"
                        }
                    ],
                    familyDetailAddress: [
                        {
                            required: true,
                            message: "请输入详细家庭地址",
                            trigger: "blur"
                        }
                    ],
                    familyCode: [{ validator: validateCode, trigger: "blur" }],
                    houseAddress: [
                        {
                            required: true,
                            type: "array",
                            message: "请选择户籍地址",
                            trigger: "change"
                        }
                    ],
                    houseDetailAddress: [
                        {
                            required: true,
                            message: "请输入详细户籍地址",
                            trigger: "blur"
                        }
                    ],
                    houseCode: [{ validator: validateCode, trigger: "blur" }],
                    nowAddress: [
                        {
                            required: true,
                            type: "array",
                            message: "请选择现地址",
                            trigger: "change"
                        }
                    ],
                    nowDetailAddress: [
                        {
                            required: true,
                            message: "请输入详细现地址",
                            trigger: "blur"
                        }
                    ],
                    nowCode: [{ validator: validateCode, trigger: "blur" }]
                }
            };
        }
    };
</script>

<style lang="less" scoped>
</style>