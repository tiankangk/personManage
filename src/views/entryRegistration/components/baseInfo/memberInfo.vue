<template>
    <Form ref="memberInfo" :model="memberInfo">
        <FormItem v-for="(item, index) in memberInfo.items" v-if="item.status" :key="index">
            <Row :gutter="16">
                <Col span="2">
                    <FormItem
                        :prop="'items.' + index + '.memberName'"
                        :rules="{required: true, message: '成员名称不能为空', trigger: 'blur'}"
                    >
                        <Input type="text" v-model="item.memberName" placeholder="请填写成员名称"></Input>
                    </FormItem>
                </Col>
                <Col span="2">
                    <FormItem
                        :prop="'items.' + index + '.memberAge'"
                        :rules="{required: true, message: '成员年龄不能为空', trigger: 'blur'}"
                    >
                        <Input type="text" v-model="item.memberAge" placeholder="请填写成员年龄"></Input>
                    </FormItem>
                </Col>
                <Col span="2">
                    <FormItem
                        :prop="'items.' + index + '.memberRlationship'"
                        :rules="{required: true, message: '与本人的关系不能为空', trigger: 'blur'}"
                    >
                        <Input type="text" v-model="item.memberRlationship" placeholder="请填写与本人的关系"></Input>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem
                        :prop="'items.' + index + '.memberWork'"
                        :rules="{required: true, message: '工作单位不能为空', trigger: 'blur'}"
                    >
                        <Input type="text" v-model="item.memberWork" placeholder="请填写工作单位"></Input>
                    </FormItem>
                </Col>
                <Col span="5">
                    <FormItem
                        :prop="'items.' + index + '.memberPost'"
                        :rules="{required: true, message: '职务不能为空', trigger: 'blur'}"
                    >
                        <Input type="text" v-model="item.memberPost" placeholder="请填写职务"></Input>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem
                        :prop="'items.' + index + '.memberIsCompany'"
                        :rules="{required: true, message: '请选择否在本公司任职', trigger: 'change'}"
                    >
                        <Select v-model="item.memberIsCompany" placeholder="请是否在本公司任职">
                            <Option value="1">是</Option>
                            <Option value="0">否</Option>
                        </Select>
                    </FormItem>
                </Col>

                <Col span="2">
                    <Button @click="handleMemberRemove(index)">Delete</Button>
                </Col>
            </Row>
        </FormItem>
        <FormItem>
            <Row>
                <Col span="2" offset="11">
                    <Button type="dashed" long @click="handleMemberAdd">添加</Button>
                </Col>
            </Row>
        </FormItem>
    </Form>
</template>

<script>
    export default {
        name: "memberIfo",
        props: {
            memberInfo: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                memberIndex: 1
            };
        },
        methods: {
            handleMemberAdd() {
                this.memberIndex++;
                this.memberInfo.items.push({
                    memberIsCompany: "",
                    memberPost: "",
                    memberWork: "",
                    memberRlationship: "",
                    memberAge: "",
                    memberName: "",
                    index: this.memberIndex,
                    status: 1
                });
            },
            handleMemberRemove(index) {
                 let newMemberInfo = { ...this.memberInfo.items[index] };
                newMemberInfo.status = 0;
                this.memberInfo.items.splice(index, 1, newMemberInfo);
                // this.memberInfo.items[index].status = 0;
            }
        },
        mounted(){
            this.memberIndex = this.memberInfo.items.length+1;
        }
    };
</script>

<style lang="less" scoped>
</style>