<template>
    <div style="position:relative;">
        <Card>
            <div class="header-content">
                <public-search :searchList="searchList" @handleSearch="handleSearch"></public-search>
                <Dropdown style="margin-left: 20px" @on-click="chooseDailyManage">
                    <Button type="primary">
                        日常管理
                        <Icon type="ios-arrow-down"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="employeeUp">员工晋升</DropdownItem>
                         <DropdownItem name="payRise">员工加薪</DropdownItem>
                          <DropdownItem name="applyLeave">请假申请</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </Card>
        <public-table class="puclic-table" :tableList="tableList" @changePage="changePage"></public-table>
        <!-- 编辑人事管理 -->
        <add-person-model :model="model" :allEntryInfo="allEntryInfo"></add-person-model>
        <!-- 预览证件照片 -->
        <preview-pic :previewPicList="previewPicList" :model="model"></preview-pic>
        <!-- 晋升的弹框 -->
        <employee-up :model="model" :chooseVal = "chooseVal"></employee-up>
        <!-- 加薪的弹框 -->
        <pay-rise :model="model" :chooseVal = "chooseVal"></pay-rise>
        <!-- 请假申请弹框 -->
        <apply-leave :model="model" :chooseVal = "chooseVal"></apply-leave>
    </div>
</template>

<script>
    import publicSearch from "components/publicSearch";
    import publicTable from "components/publicTable";
    import addPersonModel from "./components/addPersonModel";
    import previewPic from "./components/previewPic";
    import employeeUp from "./components/employeeUp"
    import applyLeave from "./components/applyLeave"
    
      import payRise from "./components/payRise"
    import { transformTime } from "@/public/tools";
    import {
        getEntryRegistrationInfo,
        getEditEntryInfo,
        getEntryPicAdress
    } from "api";
    export default {
        name: "entryRegistration",
        components: {
            publicSearch,
            publicTable,
            addPersonModel,
            previewPic,
            employeeUp,
            payRise,
            applyLeave
        },
        data() {
            return {
                // 浏览证件照的数组
                previewPicList: [],
                chooseVal:{},
                model: {
                    isModel: false,
                    isPreviewPic: false,
                    isEmployeeUp:false,
                    isPayRise:false,
                    isApplyLeave:false
                },
                searchList: {
                    username: {
                        title: "用户名/手机号",
                        type: "input",
                        val: ""
                    },
                    part: {
                        title: "部门",
                        type: "select",
                        val: "",
                        options: [
                            {
                                value: "New York",
                                label: "New York"
                            },
                            {
                                value: "London",
                                label: "London"
                            }
                        ]
                    },
                    idNum: {
                        title: "身份证号",
                        type: "input",
                        val: ""
                    },
                    entryTime: {
                        title: "日期",
                        val: "",
                        type: "selectTime"
                    }
                },
                allEntryInfo: {
                    id: 0,
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
                },
                tableList: {
                    total: 1,
                    index: 1,
                    pageSize: 10,
                    contentList: [],
                    titleList: [
                        {
                            title: "选中项",
                            align: "center",
                            width: 60,
                            key: "checkBox",
                            render: (h, params) => {
                                return h("div", [
                                    h("Checkbox", {
                                        props: {
                                            value: params.row.checkBox
                                        },
                                        on: {
                                            "on-change": e => {
                                                if (e) {
                                                    this.chooseVal = params.row;
                                                } else {
                                                    this.chooseVal = {};
                                                }
                                                this.tableList.contentList.forEach(
                                                    items => {
                                                        //先取消所有对象的勾选，checkBox设置为false
                                                        this.$set(
                                                            items,
                                                            "checkBox",
                                                            false
                                                        );
                                                    }
                                                );
                                                this.tableList.contentList[
                                                    params.index
                                                ].checkBox = e; //再将勾选的对象的checkBox设置为true
                                            }
                                        }
                                    })
                                ]);
                            }
                        },
                        {
                            title: "员工姓名",
                            key: "username"
                        },
                        {
                            title: "部门",
                            key: "part"
                        },
                        {
                            title: "手机号",
                            key: "phone"
                        },
                        {
                            title: "身份证号",
                            key: "idNum"
                        },
                        {
                            title: "操作",
                            width: 150,
                            align: "center",
                            render: (h, params) => {
                                return h("div", [
                                    h(
                                        "Button",
                                        {
                                            props: {
                                                type: "primary",
                                                size: "small"
                                            },
                                            style: {
                                                marginRight: "5px"
                                            },
                                            on: {
                                                click: () => {
                                                    console.log(params);
                                                    this.getEditInfo(params.row.id);
                                                }
                                            }
                                        },
                                        "编辑"
                                    ),
                                    h(
                                        "Button",
                                        {
                                            props: {
                                                type: "info",
                                                size: "small"
                                            },
                                            on: {
                                                click: () => {
                                                    this.getPicAdress(
                                                        params.row.id
                                                    );
                                                }
                                            }
                                        },
                                        "照片预览"
                                    )
                                ]);
                            }
                        }
                    ]
                }
            };
        },
        methods: {
            // 日常管理
            chooseDailyManage(val) {
                if(Object.keys(this.chooseVal).length === 0 ){
                      this.$Message.warning("请选择员工");
                }else {
                    if(val === 'employeeUp'){
                        this.model.isEmployeeUp = true;
                    } else if(val ==='payRise'){
                          this.model.isPayRise = true;
                    }else if(val ==='applyLeave'){
                          this.model.isApplyLeave = true;
                    }
                    
                }
                console.log(val);
            },
            // 获取预览的照片地址
            getPicAdress(id) {
                getEntryPicAdress({ id }).then(res => {
                    console.log("res", res);
                    if (res.result.length === 0) {
                        this.$Message.error("没有预览的照片");
                    } else {
                        this.model.isPreviewPic = true;
                        this.previewPicList = res.result;
                    }
                    console.log(res);
                });
            },
            // 转换搜索的值
            transformSearchList() {
                let newSearchList = {};
                for (let ind in this.searchList) {
                    newSearchList[ind] = this.searchList[ind].val;
                }
                return newSearchList;
            },
            // 搜索
            handleSearch() {
                this.initData();
            },
            // 点击分页
            changePage(page) {
                console.log(page);
            },
            // 弹出入职登记模态框
            dropEntryModel() {
                this.allEntryInfo.id = 0;
                this.model.isModel = true;
            },
            // 初始化表格数据
            initData() {
                let newSearchList = this.transformSearchList();
                console.log(newSearchList.entryTime);
                if (newSearchList.entryTime[0]) {
                    newSearchList.entryTime = [
                        transformTime(newSearchList.entryTime[0]),
                        transformTime(newSearchList.entryTime[1])
                    ];
                } else {
                    newSearchList.entryTime = "";
                }
                getEntryRegistrationInfo({
                    pageIndex: this.tableList.index,
                    pageSize: this.tableList.pageSize,
                    searchList: newSearchList
                }).then(res => {
                    console.log(res);
                    this.tableList.contentList = res.result;
                    this.tableList.total = res.total;
                });
            },
            // 编辑时获得员工信息
            getEditInfo(id) {
                this.allEntryInfo.id = id;
                getEditEntryInfo({ id: id }).then(res => {
                    this.model.isModel = true;
                    this.allEntryInfo.userInfo = res.userInfo;
                    console.log("userInfo", this.allEntryInfo.userInfo);
                    this.allEntryInfo.userInfo.identityCardName =
                        res.userInfo.identityCard;
                    this.allEntryInfo.userInfo.registPhotoName =
                        res.userInfo.registPhoto;
                    this.allEntryInfo.userInfo.nativePlace = res.userInfo.nativePlace.split(
                        ","
                    );
                    this.allEntryInfo.skillInfo.items = res.skillInfo;
                    this.allEntryInfo.skillInfo.items.forEach((item, ind) => {
                        item.index = res.skillInfo[ind].ind;
                        item.status = 1;
                    });
                    this.allEntryInfo.schoolInfo.items = res.schoolInfo;
                    this.allEntryInfo.schoolInfo.items.forEach((item, ind) => {
                        item.index = res.schoolInfo[ind].ind;
                        item.status = 1;
                        item.idPhotoName = res.schoolInfo[ind].idPhoto;
                    });
                    this.allEntryInfo.memberInfo.items = res.memberInfo;
                    this.allEntryInfo.memberInfo.items.forEach((item, ind) => {
                        item.index = res.memberInfo[ind].ind;
                        item.status = 1;
                    });
                    this.allEntryInfo.addressInfo = res.addressInfo;
                    this.allEntryInfo.addressInfo.familyAddress = res.addressInfo.familyAddress.split(
                        ","
                    );
                    this.allEntryInfo.addressInfo.houseAddress = res.addressInfo.houseAddress.split(
                        ","
                    );
                    this.allEntryInfo.addressInfo.nowAddress = res.addressInfo.nowAddress.split(
                        ","
                    );
                });
            }
        },
        created() {
            this.initData();
        }
    };
</script>

<style lang="less" scoped>
.header-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
</style>