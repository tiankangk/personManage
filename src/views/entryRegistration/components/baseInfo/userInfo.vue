<template>
    <div>
        <Form
            class="model-content"
            ref="userInfo"
            :model="userInfo"
            :rules="ruleValidate"
            :label-width="90"
            inline
        >
            <FormItem prop="company" label="公司">
                <Cascader
                    v-model="userInfo.company"
                    @on-change="handleChangeCompany"
                    :data="companyList"
                    :placeholder="userInfo.companyName"
                    change-on-select
                ></Cascader>
                <!-- <Select
                    v-model="userInfo.company"
                    @on-change="handleChangeCompany(userInfo.company)"
                    placeholder="请选择入职公司"
                >
                    <Option
                        v-for="company in companyList"
                        :key="company.id"
                        :value="company.id"
                    >{{company.name}}</Option>
                </Select>-->
            </FormItem>
            <FormItem prop="part" label="部门">
                <Cascader
                    v-model="userInfo.part"
                     :placeholder="userInfo.partName"
                    @on-change="handleChangeCompany"
                    :data="partList"
                    change-on-select
                ></Cascader>
                <!-- <Select
                    v-model="userInfo.part"
                    @on-change="handleChangeCompany(userInfo.part)"
                    placeholder="请选择部门"
                >
                    <Option v-for="part in partList" :key="part.id" :value="part.id">{{part.name}}</Option>
                </Select>-->
            </FormItem>
            <FormItem prop="post" label="岗位">
                <Cascader
                    v-model="userInfo.post"
                     :placeholder="userInfo.postName"
                    :data="postList"
                      @on-change="handleChangeCompany"
                    change-on-select
                ></Cascader>
                <!-- <Select v-model="userInfo.post" placeholder="请选择岗位">
                    <Option v-for="job in jobList" :key="job.id" :value="job.id">{{job.name}}</Option>
                </Select>-->
            </FormItem>

            <FormItem prop="job" label="职务">
                 <Cascader
                    v-model="userInfo.job"
                      :placeholder="userInfo.jobName"
                    :data="jobList"
                    change-on-select
                ></Cascader>
                <!-- <Select v-model="userInfo.job" placeholder="请选择职务">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select> -->
            </FormItem>
            <FormItem class="upload-regist-photo">
                <div class="regist-photo-container">
                    <img class="regist-photo" :src="getRegistPhotoPic" alt="登记照">
                    <Upload
                        class="regist-photo-btn"
                        :show-upload-list="false"
                        :before-upload="handleUploadRegistPhoto"
                        action="//jsonplaceholder.typicode.com/posts/"
                    >
                        <Button icon="ios-cloud-upload-outline">上传登记照</Button>
                    </Upload>
                </div>
                <!-- <Row>
                <Col :span="10">
                   
                </Col>
                <Col :span="14">
                    <Input disabled type="text" v-model="userInfo.registPhotoName"></Input>
                </Col>
                </Row>-->
            </FormItem>
            <FormItem prop="username" label="名称">
                <Input type="text" v-model="userInfo.username" placeholder="请输入名称"></Input>
            </FormItem>
            <FormItem prop="sex" label="性别">
                <Select v-model="userInfo.sex" placeholder="请选择性别">
                    <Option value="man">男</Option>
                    <Option value="women">女</Option>
                </Select>
            </FormItem>
            <FormItem prop="birth" label="出生日期">
                <DatePicker
                    style="width:100%;"
                    type="date"
                    format="yyyy-MM-dd"
                    placeholder="请选择出生日期"
                    v-model="userInfo.birth"
                ></DatePicker>
            </FormItem>
            <FormItem prop="nativePlace" label="籍贯">
                <el-cascader
                    style="width:100%;"
                    size="small"
                    :options="nativeOption"
                    placeholder="请选择籍贯"
                    v-model="userInfo.nativePlace"
                ></el-cascader>
            </FormItem>
            <FormItem prop="phone" label="联系电话">
                <Input type="text" v-model="userInfo.phone" placeholder="请输入联系电话"></Input>
            </FormItem>
            <FormItem prop="email" label="E_MAIL">
                <Input type="text" v-model="userInfo.email" placeholder="请输入E_MAIL"></Input>
            </FormItem>
            <FormItem prop="qqNum" label="QQ/微信">
                <Input type="text" v-model="userInfo.qqNum" placeholder="请输入QQ/微信"></Input>
            </FormItem>
            <FormItem prop="blood" label="血型">
                <Select v-model="userInfo.blood" placeholder="请选择血型">
                    <Option value="A">A型</Option>
                    <Option value="B">B型</Option>
                    <Option value="O">O型</Option>
                    <Option value="AB">AB型</Option>
                </Select>
            </FormItem>
            <FormItem prop="marriage" label="婚姻状况">
                <Select v-model="userInfo.marriage" placeholder="请选择婚姻状况">
                    <Option value="married">已婚</Option>
                    <Option value="unMarried">未婚</Option>
                </Select>
            </FormItem>
            <FormItem prop="nation" label="民族">
                <Select v-model="userInfo.nation" placeholder="请选择民族">
                    <Option
                        v-for="(nation,nationInd) in nationList"
                        :key="nationInd"
                        :value="nation"
                    >{{nation}}</Option>
                </Select>
            </FormItem>
            <FormItem prop="face" label="政治面貌">
                <Select v-model="userInfo.face" placeholder="请选政治面貌">
                    <Option value="leagueMember">团员</Option>
                    <Option value="partyMember">党员</Option>
                </Select>
            </FormItem>
            <FormItem prop="height" label="身高">
                <Input type="text" v-model="userInfo.height" placeholder="请输入身高">
                    <span slot="append">cm</span>
                </Input>
            </FormItem>
            <FormItem prop="emergeContact" label="紧急联系人">
                <Input type="text" v-model="userInfo.emergeContact" placeholder="请输入紧急联系人"></Input>
            </FormItem>
            <FormItem prop="relation" label="与本人关系">
                <Input type="text" v-model="userInfo.relation" placeholder="请输入与本人的关系"></Input>
            </FormItem>
            <FormItem prop="emergeContactPhone" label="联系人电话">
                <Input type="text" v-model="userInfo.emergeContactPhone" placeholder="请输入紧急联系人电话"></Input>
            </FormItem>
            <FormItem prop="weight" label="体重">
                <Input type="text" v-model="userInfo.weight" placeholder="请输入体重">
                    <span slot="append">千克</span>
                </Input>
            </FormItem>
            <FormItem prop="languageLevel" label="语言水平">
                <Select v-model="userInfo.languageLevel" placeholder="请选语言水平">
                    <Option
                        v-for="(language,languageInd) in languageList"
                        :key="languageInd"
                        :value="language"
                    >{{language}}</Option>
                </Select>
            </FormItem>
            <FormItem prop="englishLevel" label="英语等级">
                <Input type="text" v-model="userInfo.englishLevel" placeholder="请输入英语等级"></Input>
            </FormItem>
            <FormItem prop="speciality" label="特长">
                <Input type="text" v-model="userInfo.speciality" placeholder="请输入特长"></Input>
            </FormItem>

            <FormItem prop="idNum" label="身份证号">
                <Input type="text" v-model="userInfo.idNum" placeholder="请输入身份证号"></Input>
            </FormItem>

            <FormItem>
                <Row>
                    <Col :span="12">
                        <Upload
                            :show-upload-list="false"
                            :before-upload="handleUploadIdentityCard"
                            action="//jsonplaceholder.typicode.com/posts/"
                        >
                            <Button icon="ios-cloud-upload-outline">上传身份证</Button>
                        </Upload>
                    </Col>
                    <Col :span="12">
                        <Input disabled type="text" v-model="userInfo.identityCardName">
                            <Icon
                                type="ios-eye-outline"
                                slot="suffix"
                                @click.native="handleView(userInfo.identityCardUrl)"
                            ></Icon>
                        </Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem prop="idValide" label="身份证效期">
                <DatePicker
                    style="width:100%;"
                    type="date"
                    placeholder="请选择身份证有效期"
                    v-model="userInfo.idValide"
                ></DatePicker>
            </FormItem>
            <FormItem prop="entryTime" label="入职日期">
                <DatePicker
                    style="width:100%;"
                    type="date"
                    placeholder="请选择入职日期"
                    v-model="userInfo.entryTime"
                ></DatePicker>
            </FormItem>
            <FormItem prop="registerTime" label="登记日期">
                <DatePicker
                    style="width:100%;"
                    type="date"
                    placeholder="请选择登记日期"
                    v-model="userInfo.registerTime"
                ></DatePicker>
            </FormItem>
            <FormItem prop="wageCrrection" label="转正工资">
                <Input type="text" v-model="userInfo.wageCrrection" placeholder="请输入转正工资"></Input>
            </FormItem>
            <FormItem prop="applicationSource" label="应聘来源">
                <Input type="text" v-model="userInfo.applicationSource" placeholder="请输入应聘来源"></Input>
            </FormItem>
            <FormItem prop="recommender" label="推荐人">
                <Input type="text" v-model="userInfo.recommender" placeholder="请输入推荐人"></Input>
            </FormItem>
        </Form>
        <Modal title="View Image" v-model="isIdentityCardModal">
            <img :src="identityCardPic" v-if="isIdentityCardModal" style="width: 100%">
        </Modal>
    </div>
</template>

<script>
    import { getSelectCompanyInfor, getSelectChildInfor } from "api";
    import { provinceAndCityData } from "element-china-area-data";
    import nationList from "./nation.js";
    import {getFormat} from "@/public/tools.js"
    export default {
        name: "userInfo",
        props: {
            userInfo: {
                type: Object,
                required: true
            }
        },
        computed: {
            getRegistPhotoPic() {
                return this.registPhotoPic
                    ? this.registPhotoPic
                    : this.userInfo.registPhoto;
            }
        },
        data() {
            const validateEmail = (rule, value, callback) => {
                let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                if (value === "") {
                    callback(new Error("请输入email"));
                } else {
                    if (!reg.test(value)) {
                        callback(new Error("email格式不正确"));
                    }
                    callback();
                }
            };

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
            const validateIdNum = (rule, value, callback) => {
                let reg = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
                if (value === "") {
                    callback(new Error("请输入身份证号"));
                } else {
                    if (!reg.test(value)) {
                        callback(new Error("身份证号格式不正确"));
                    }
                    callback();
                }
            };
            const validatePhone = (rule, value, callback) => {
                let reg = /^1[345678][0-9]\d{8}$/;
                if (value === "") {
                    callback(new Error("请输入联系电话"));
                } else {
                    if (!reg.test(value)) {
                        callback(new Error("电话格式不正确"));
                    }
                    callback();
                }
            };
            const validateHeight = (rule, value, callback) => {
                let reg = /^[1-9]\d*$/;
                if (value === "") {
                    callback(new Error("请输入身高"));
                } else {
                    if (!reg.test(value)) {
                        callback(new Error("格式不正确"));
                    }
                    callback();
                }
            };
            const validateWeight = (rule, value, callback) => {
                let reg = /^([1-9][0-9]*)+(\.[0-9]{1,2})?$/;
                if (value === "") {
                    callback(new Error("内容不能为空"));
                } else {
                    if (!reg.test(value)) {
                        callback(new Error("格式不正确"));
                    }
                    callback();
                }
            };
            return {
                companyList: [],
                partList: [],
                postList: [],
                jobList:[],
                identityCardPic: "",
                registPhotoPic: "",
                isIdentityCardModal: false,
                nationList: [],
                nativeOption: provinceAndCityData,
                languageList: ["中文", "英语", "日语", "韩语", "法语", "德语"],
                ruleValidate: {
                    idValide: [
                        {
                            required: true,
                            type: "date",
                            message: "请选择身份证有效期",
                            trigger: "change"
                        }
                    ],
                    idNum: [{ validator: validateIdNum, trigger: "blur" }],
                    speciality: [
                        {
                            required: true,
                            message: "请输入特长",
                            trigger: "blur"
                        }
                    ],
                    englishLevel: [
                        {
                            required: true,
                            message: "请选英语等级",
                            trigger: "blur"
                        }
                    ],
                    languageLevel: [
                        {
                            required: true,
                            message: "请选语言水平",
                            trigger: "change"
                        }
                    ],
                    weight: [
                        {
                            validator: validateWeight,
                            trigger: "blur"
                        }
                    ],
                    emergeContactPhone: [
                        { validator: validatePhone, trigger: "blur" }
                    ],
                    relation: [
                        {
                            required: true,
                            message: "请选与本人的关系",
                            trigger: "blur"
                        }
                    ],

                    recommender: [
                        {
                            required: true,
                            message: "请输入推荐人",
                            trigger: "blur"
                        }
                    ],
                    applicationSource: [
                        {
                            required: true,
                            message: "请输入应聘来源",
                            trigger: "blur"
                        }
                    ],
                    emergeContact: [
                        {
                            required: true,
                            message: "请输入紧急联系人",
                            trigger: "blur"
                        }
                    ],
                    height: [
                        {
                            validator: validateHeight,
                            trigger: "blur"
                        }
                    ],
                    face: [
                        {
                            required: true,
                            message: "请选择政治面貌",
                            trigger: "change"
                        }
                    ],
                    nation: [
                        {
                            required: true,
                            message: "请选择民族",
                            trigger: "change"
                        }
                    ],
                    marriage: [
                        {
                            required: true,
                            message: "请选择婚姻状况",
                            trigger: "change"
                        }
                    ],
                    blood: [
                        {
                            required: true,
                            message: "请选择血型",
                            trigger: "change"
                        }
                    ],
                    qqNum: [
                        {
                            required: true,
                            message: "请输入QQ/微信",
                            trigger: "blur"
                        }
                    ],
                    email: [{ validator: validateEmail, trigger: "blur" }],
                    phone: [{ validator: validatePhone, trigger: "blur" }],
                    nativePlace: [
                        {
                            required: true,
                            type: "array",
                            message: "请选择籍贯",
                            trigger: "change"
                        }
                    ],
                    birth: [
                        {
                            required: true,
                            type: "date",
                            message: "请选择出生日期",
                            trigger: "change"
                        }
                    ],

                    entryTime: [
                        {
                            required: true,
                            type: "date",
                            message: "请选择入职日期",
                            trigger: "change"
                        }
                    ],
                    registerTime: [
                        {
                            required: true,
                            type: "date",
                            message: "请选择登记日期",
                            trigger: "change"
                        }
                    ],

                    wageCrrection: [
                        {
                            validator: validateWeight,
                            // message: "请输入转正工资",
                            trigger: "blur"
                        }
                    ],
                    username: [
                        {
                            required: true,
                            message: "请输入名称",
                            trigger: "blur"
                        }
                    ],
                    sex: [
                        {
                            required: true,
                            message: "请选择性别",
                            trigger: "change"
                        }
                    ],
                    company: [
                        {
                            required: true,
                            type: "array",
                            message: "请选择入职公司",
                            trigger: "change"
                        }
                    ],
                    part: [
                        {
                            required: true,
                            type: "array",
                            message: "请选择部门",
                            trigger: "change"
                        }
                    ],
                    post: [
                        {
                            required: true,
                            type: "array",
                            message: "请选择岗位",
                            trigger: "change"
                        }
                    ],
                    job: [
                        {
                            required: true,
                             type: "array",
                            message: "请选择职务",
                            trigger: "change"
                        }
                    ]
                }
            };
        },
        methods: {
            // 下拉选择公司
            handleChangeCompany(idList) {
                console.log("idList", idList);
                getSelectChildInfor({ id: idList[idList.length - 1] }).then(res => {
                    console.log(res);
                    if (0 in res.result) {
                        if (res.result[0].type == 2) {
                            this.partList = getFormat(res.result,2);
                            this.userInfo.part = [];
                             this.userInfo.post = [];
                        } else if (res.result[0].type == 3) {
                            this.postList = getFormat(res.result,3);
                              this.userInfo.post = [];
                               this.userInfo.job = [];
                        }else if (res.result[0].type == 4) {
                            this.jobList = getFormat(res.result,4);
                              this.userInfo.job = [];
                        }
                    }
                });
            },
            handleView(url) {
                // if(url && !this.identityCardPic){
                this.identityCardPic = url ? url : this.userInfo.identityCardName;
                // }

                this.isIdentityCardModal = true;
            },
            handleUploadIdentityCard(file) {
                let that = this;
                this.userInfo.identityCard = file;
                this.$set(this.userInfo, "identityCardName", file.name);
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = e => {
                    that.$set(this.userInfo, "identityCardUrl", reader.result);
                    // that.identityCardPic = reader.result; //reader.result是base64格式的图片
                };

                // this.userInfo.identityCardName = file.name;
            },
            handleUploadRegistPhoto(file) {
                // this.registPhotoPic =
                let that = this;
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = e => {
                    that.registPhotoPic = reader.result; //reader.result是base64格式的图片
                };

                this.userInfo.registPhoto = file;
                // delete this.userInfo.registPhotoName;
                // this.$set(this.userInfo, "registPhotoName", file.name);
                // this.userInfo.registPhotoName = file.name;
            },

           
            // 获取下拉框的公司的信息
            getCompanyInfor() {
                getSelectCompanyInfor({ type: 1 }).then(res => {
                    if (0 in res.result) {
                        console.log(res.result);
                        this.companyList = getFormat(res.result,1);
                    }
                });
            }
        },
        mounted() {
            this.nationList = nationList;
            this.getCompanyInfor();
            // this.registPhotoPic = this.userInfo.registPhoto;
        }
    };
</script>

<style lang="less" scoped>
.model-content {
    .ivu-form-item {
        width: 19%;
    }
    .upload-regist-photo {
        float: right;
        .regist-photo-container {
            border-radius: 4px;
            padding: 5px;
            border: 1px solid #a59fa4;
            width: 130px;
            height: 140px;
            margin: auto;
            position: relative;
            .regist-photo {
                width: 100%;
                height: 100%;
            }
            .regist-photo-btn {
                display: none;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
}
.regist-photo-container:hover .regist-photo-btn {
    display: block !important;
}
</style>