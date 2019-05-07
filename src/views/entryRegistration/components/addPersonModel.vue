<template>
    <div>
        <Modal v-model="model.isModel" fullscreen title="入职登记">
            <Divider>基本信息</Divider>
            <user-info ref="userInfo" :userInfo="allEntryInfo.userInfo"></user-info>
            <Divider>住址信息</Divider>
            <address-info ref="addressInfo" :addressInfo="allEntryInfo.addressInfo"></address-info>
            <Divider>家庭成员</Divider>
            <member-info ref="memberInfo" :memberInfo="allEntryInfo.memberInfo"></member-info>
            <Divider>职业技能</Divider>
            <skill-info ref="skillInfo" :skillInfo="allEntryInfo.skillInfo"></skill-info>
            <Divider>学历信息</Divider>
            <school-info
                ref="schoolInfo"
                :id="allEntryInfo.id"
                :schoolInfo="allEntryInfo.schoolInfo"
            ></school-info>
            <div slot="footer">
                <Button type="text" size="large" @click="model.isModel = false">取消</Button>
                <Button
                    v-if="!isChoose"
                    type="primary"
                    size="large"
                    :loading="loading"
                    @click="handleSubmit"
                >
                    <span v-if="!loading">提交</span>
                    <span v-else>Loading...</span>
                </Button>
                <!-- <Button v-if="!isChoose" type="primary" size="large" @click="handleSubmit">确定</Button> -->
            </div>
        </Modal>
    </div>
</template>

<script>
    import userInfo from "./baseInfo/userInfo";
    import addressInfo from "./baseInfo/addressInfo";
    import memberInfo from "./baseInfo/memberInfo";
    import skillInfo from "./baseInfo/skillInfo";
    import schoolInfo from "./baseInfo/schoolInfo";
    import { transformTime } from "@/public/tools";
    import { keepEntryRegistration } from "api";
    export default {
        name: "addPersonModel",
        inject: ["reload"],
        components: {
            userInfo,
            addressInfo,
            memberInfo,
            skillInfo,
            schoolInfo
        },
        props: {
            model: {
                type: Object,
                required: true
            },
            allEntryInfo: {
                type: Object,
                required: true
            },
            chooseVal: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                loading: false
            };
        },
        computed: {
            isChoose() {
                return Object.keys(this.chooseVal).length === 0;
            }
        },
        methods: {
            // 过滤status为0
            filterStatus() {
                this.allEntryInfo.schoolInfo.items = this.allEntryInfo.schoolInfo.items.filter(
                    item => {
                        return item.status == 1;
                    }
                );
                this.allEntryInfo.memberInfo.items = this.allEntryInfo.memberInfo.items.filter(
                    item => {
                        return item.status == 1;
                    }
                );
                this.allEntryInfo.skillInfo.items = this.allEntryInfo.skillInfo.items.filter(
                    item => {
                        return item.status == 1;
                    }
                );
            },
            handleSubmit(name) {
              
                let isRight = true;

                this.$refs.addressInfo.$refs.addressInfo.validate(valid => {
                    if (!valid) {
                        isRight = false;
                    }
                });
                this.$refs.userInfo.$refs.userInfo.validate(valid => {
                    if (!valid) {
                        isRight = false;
                    }
                });
                this.$refs.memberInfo.$refs.memberInfo.validate(valid => {
                    if (!valid) {
                        isRight = false;
                    }
                });
                this.$refs.skillInfo.$refs.skillInfo.validate(valid => {
                    if (!valid) {
                        isRight = false;
                    }
                });
                this.$refs.schoolInfo.$refs.schoolInfo.validate(valid => {
                    if (!valid) {
                        isRight = false;
                    }
                });
                if (isRight) {
                      this.loading = true;
                    this.filterStatus();
                    let param = new FormData();
                    this.allEntryInfo.schoolInfo.items.forEach((item, ind) => {
                        param.append("schoolInfo" + item.index, item.idPhotoFile);
                        item.graduationTime = transformTime(item.graduationTime);
                    });
                    this.allEntryInfo.userInfo.birth = transformTime(
                        this.allEntryInfo.userInfo.birth
                    );
                    this.allEntryInfo.userInfo.idValide = transformTime(
                        this.allEntryInfo.userInfo.idValide
                    );
                    this.allEntryInfo.userInfo.entryTime = transformTime(
                        this.allEntryInfo.userInfo.entryTime
                    );
                    this.allEntryInfo.userInfo.registerTime = transformTime(
                        this.allEntryInfo.userInfo.registerTime
                    );
                    this.allEntryInfo.skillInfo.items.forEach((item, ind) => {
                        item.skillTime = transformTime(item.skillTime);
                    });
                    param.append("id", this.allEntryInfo.id);
                    delete this.allEntryInfo.userInfo.identityCardUrl;
                    delete this.allEntryInfo.userInfo.registPhotoPic;
                    param.append(
                        "userInfo",
                        JSON.stringify(this.allEntryInfo.userInfo)
                    );
                    param.append(
                        "addressInfo",
                        JSON.stringify(this.allEntryInfo.addressInfo)
                    );
                    param.append(
                        "memberInfo",
                        JSON.stringify(this.allEntryInfo.memberInfo)
                    );
                    param.append(
                        "skillInfo",
                        JSON.stringify(this.allEntryInfo.skillInfo)
                    );
                    this.allEntryInfo.schoolInfo.items.forEach(item => {
                        delete item.idPhotoUrl;
                    });
                    param.append(
                        "schoolInfo",
                        JSON.stringify(this.allEntryInfo.schoolInfo)
                    );
                    param.append(
                        "identityCard",
                        this.allEntryInfo.userInfo.identityCard
                    );
                    param.append(
                        "registPhoto",
                        this.allEntryInfo.userInfo.registPhoto
                    );
                    keepEntryRegistration(param).then(res => {
                        console.log(res);
                        this.loading = false;
                        if (res.success) {
                            this.$Message.success("提交成功");

                            this.reload();
                        } else {
                            this.$Message.error("提交失败，请重新提交");
                        }
                    });
                }
            }
        }
    };
</script>

<style lang="less" scoped>
</style>