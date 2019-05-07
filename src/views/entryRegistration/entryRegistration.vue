<template>
    <div>
        <Divider>基本信息</Divider>
        <user-info ref="userInfo" :userInfo="userInfo"></user-info>
        <Divider>住址信息</Divider>
        <address-info ref="addressInfo" :addressInfo="addressInfo"></address-info>
        <Divider>家庭成员</Divider>
        <member-info ref="memberInfo" :memberInfo="memberInfo"></member-info>
        <Divider>职业技能</Divider>
        <skill-info ref="skillInfo" :skillInfo="skillInfo"></skill-info>
        <Divider>学历信息</Divider>
        <school-info ref="schoolInfo" :schoolInfo="schoolInfo"></school-info>
        <div class="footer">
            <Button type="primary" size="large" :loading="loading" @click="handleSubmit">
                <span v-if="!loading">提交</span>
                <span v-else>Loading...</span>
            </Button>
            <!-- <Button type="primary" size="large" @click="handleSubmit">确定</Button> -->
        </div>
    </div>
</template>

<script>
    import userInfo from "./components/baseInfo/userInfo";
    import addressInfo from "./components/baseInfo/addressInfo";
    import memberInfo from "./components/baseInfo/memberInfo";
    import skillInfo from "./components/baseInfo/skillInfo";
    import schoolInfo from "./components/baseInfo/schoolInfo";
    import { transformTime } from "@/public/tools";
    import { keepEntryRegistration } from "api";
    export default {
        name: "entryRegistration",
        inject: ["reload"],
        components: {
            userInfo,
            addressInfo,
            memberInfo,
            skillInfo,
            schoolInfo
        },
        data() {
            return {
                loading: false,
                schoolInfo: {
                    items: [
                        {
                            schoolEduction: "",
                            schoolName: "",
                            schoolSpecial: "",
                            graduationTime: "",
                            schoolStyle: "",
                            idPhotoFile: "",
                            index: 1,
                            status: 1
                        }
                    ]
                },
                skillInfo: {
                    items: [
                        {
                            skillTime: "",
                            skillType: "",
                            skillLevel: "",
                            skillName: "",
                            index: 1,
                            status: 1
                        }
                    ]
                },
                memberInfo: {
                    items: [
                        {
                            memberIsCompany: "",
                            memberPost: "",
                            memberWork: "",
                            memberRlationship: "",
                            memberAge: "",
                            memberName: "",
                            index: 1,
                            status: 1
                        }
                    ]
                },
                addressInfo: {
                    familyAddress: [],
                    familyDetailAddress: "",
                    familyCode: "",
                    houseAddress: [],
                    houseDetailAddress: "",
                    houseCode: "",
                    nowAddress: [],
                    nowDetailAddress: "",
                    nowCode: ""
                },

                userInfo: {
                    company: "",
                    part: "",
                    post: "",
                    job: "",
                    username: "",
                    sex: "",
                    birth: "",
                    nativePlace: [],
                    phone: "",
                    email: "",
                    qqNum: "",
                    blood: "",
                    marriage: "",
                    nation: "",
                    face: "",
                    height: "",
                    emergeContact: "",
                    relation: "",
                    emergeContactPhone: "",
                    weight: "",
                    languageLevel: "",
                    englishLevel: "",
                    speciality: "",
                    idNum: "",
                    idValide: "",
                    entryTime: "",
                    registerTime: "",
                    wageCrrection: "",
                    applicationSource: "",
                    recommender: "",
                    identityCard: "",
                    identityCardName: "",
                    registPhoto: "",
                    registPhotoName: ""
                }
            };
        },
        methods: {
            // 过滤status为0
            filterStatus() {
                this.schoolInfo.items = this.schoolInfo.items.filter(item => {
                    return item.status == 1;
                });
                this.memberInfo.items = this.memberInfo.items.filter(item => {
                    return item.status == 1;
                });
                this.skillInfo.items = this.skillInfo.items.filter(item => {
                    return item.status == 1;
                });
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
                    this.schoolInfo.items.forEach((item, ind) => {
                        param.append("schoolInfo" + item.index, item.idPhotoFile);
                        item.graduationTime = transformTime(item.graduationTime);
                    });
                    this.userInfo.birth = transformTime(this.userInfo.birth);
                    this.userInfo.idValide = transformTime(this.userInfo.idValide);
                    this.userInfo.entryTime = transformTime(
                        this.userInfo.entryTime
                    );
                    this.userInfo.registerTime = transformTime(
                        this.userInfo.registerTime
                    );
                    this.skillInfo.items.forEach((item, ind) => {
                        item.skillTime = transformTime(item.skillTime);
                    });
                    delete this.userInfo.identityCardUrl;
                    delete this.userInfo.registPhotoPic;
                    param.append("userInfo", JSON.stringify(this.userInfo));
                    param.append("addressInfo", JSON.stringify(this.addressInfo));
                    param.append("memberInfo", JSON.stringify(this.memberInfo));
                    param.append("skillInfo", JSON.stringify(this.skillInfo));
                    this.schoolInfo.items.forEach(item => {
                        delete item.idPhotoUrl;
                    });
                    param.append("schoolInfo", JSON.stringify(this.schoolInfo));
                    param.append("identityCard", this.userInfo.identityCard);
                    param.append("registPhoto", this.userInfo.registPhoto);
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
.footer {
    display: flex;
    justify-content: flex-end;
}
</style>