<template>
    <Form ref="skillInfo" :model="skillInfo">
        <FormItem v-for="(item, index) in skillInfo.items" v-if="item.status" :key="index">
            <Row :gutter="16">
                <Col span="6">
                    <FormItem
                        :prop="'items.' + index + '.skillName'"
                        :rules="{required: true, message: '资格/职称/技能不能为空', trigger: 'blur'}"
                    >
                        <Input type="text" v-model="item.skillName" placeholder="请填写资格/职称/技能"></Input>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem
                        :prop="'items.' + index + '.skillLevel'"
                        :rules="{required: true, message: '技能等级不能为空', trigger: 'blur'}"
                    >
                        <Input type="text" v-model="item.skillLevel" placeholder="请填写技能等级"></Input>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem
                        :prop="'items.' + index + '.skillType'"
                        :rules="{required: true, message: '类型不能为空', trigger: 'blur'}"
                    >
                        <Input type="text" v-model="item.skillType" placeholder="请填类型"></Input>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem
                        :prop="'items.' + index + '.skillTime'"
                        :rules="{required: true,type:'date', message: '请选择获得时间', trigger: 'change'}"
                    >
                        <DatePicker
                            style="width:100%;"
                            type="date"
                            placeholder="请选择获得时间"
                            v-model="item.skillTime"
                        ></DatePicker>
                    </FormItem>
                </Col>

                <Col span="2">
                    <Button @click="handleSkillRemove(index)">Delete</Button>
                </Col>
            </Row>
        </FormItem>
        <FormItem>
            <Row>
                <Col span="2" offset="11">
                    <Button type="dashed" long @click="handleSkillAdd">添加</Button>
                </Col>
            </Row>
        </FormItem>
    </Form>
</template>

<script>
    export default {
        name: "skillInfo",
        props: {
            skillInfo: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                skillIndex: 1
            };
        },
        methods: {
            handleSkillAdd() {
                this.skillIndex++;
                this.skillInfo.items.push({
                    skillTime: "",
                    skillType: "",
                    skillLevel: "",
                    skillName: "",
                    index: this.skillIndex,
                    status: 1
                });
            },
            handleSkillRemove(index) {
                // this.skillInfo.items[index].status = 0;
                let newSkillInfo = { ...this.skillInfo.items[index] };
                newSkillInfo.status = 0;
                this.skillInfo.items.splice(index, 1, newSkillInfo);
            }
        },
        mounted(){
            this.skillIndex = this.skillInfo.items.length +1;
        }
    };
</script>

<style lang="less" scoped>
</style>