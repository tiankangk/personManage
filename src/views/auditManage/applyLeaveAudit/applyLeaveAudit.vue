<template>
    <div>
        <Card>
            <div class="header-content">
                <public-search :searchList="searchList" @handleSearch="handleSearch"></public-search>
            </div>
        </Card>
        <public-table :loading="loading" class="puclic-table" :tableList="tableList" @changePage="changePage"></public-table>
        <apply-leave-model :model="model" :userInfo="userInfo"></apply-leave-model>
    </div>
</template>

<script>
    import applyLeaveModel from "./components/applyLeaveModel";
    import publicSearch from "components/publicSearch";
    import publicTable from "components/publicTable";
    import { getApplyLeaveInfo } from "api";
    import { transformTime } from "@/public/tools";
    export default {
        name: "applyLeaveAudit",
        components: {
            publicSearch,
            publicTable,
            applyLeaveModel
        },
        data() {
            return {
                loading:false,
                userInfo: {},
                model: {
                    isApplyLeaveModel: false
                },
                searchList: {
                    username: {
                        title: "用户名/手机号",
                        type: "input",
                        val: ""
                    },
                    part: {
                        title: "职务",
                        type: "cascader",
                        val: []
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
                tableList: {
                    total: 1,
                    index: 1,
                    pageSize: 10,
                    contentList: [],
                    titleList: [
                        {
                            title: "员工姓名",
                            key: "username"
                        },
                        {
                            title: "部门",
                            render: (h, params) => {
                                return h(
                                    "div",
                                    `${params.row.companyName}-${params.row.partName}-${params.row.postName}-${params.row.jobName}`
                                   
                                );
                            }
                        },
                        // {
                        //     title: "职务",
                        //     key: "post"
                        // },
                        {
                            title: "请假类型",
                            key: "type"
                        },
                        {
                            title: "请假天数",
                            key: "days"
                        },
                        {
                            title: "请假时间",
                            render: (h, params) => {
                                return h(
                                    "div",
                                    params.row.startTime.split("T")[0] +
                                        "~" +
                                        params.row.endTime.split("T")[0]
                                );
                            }
                        },

                        {
                            title: "申请时间",
                            render: (h, params) => {
                                return h("div", params.row.applyTime.split("T")[0]);
                            }
                        },
                        {
                            title: "状态",
                            render: (h, params) => {
                                return h(
                                    "div",
                                    {
                                        style: {
                                            color:
                                                params.row.status === "F"
                                                    ? "red"
                                                    : "green"
                                        }
                                    },
                                    params.row.status === "F" ? "未审核" : "已审核"
                                );
                            }
                        },
                        {
                            title: "操作",
                            width: 200,
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
                                                marginRight: "5px",
                                                 display:params.row.status === "F" ? "inline-block" : "none"
                                            },
                                            on: {
                                                click: () => {
                                                    console.log(params);
                                                    this.model.isApplyLeaveModel = true;
                                                    this.userInfo = {
                                                        id: params.row.id,
                                                        username:
                                                            params.row.username
                                                    };
                                                }
                                            }
                                        },
                                        "审批"
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
                                                    this.$Modal.info({
                                                        title: "请假理由",
                                                        content: params.row.reason
                                                    });
                                                }
                                            }
                                        },
                                        "请假理由"
                                    ),
                                    h(
                                        "Button",
                                        
                                        {
                                            props: {
                                                type: "info",
                                                size: "small"
                                            },
                                            style: {
                                                marginLeft: "5px",
                                                display:params.row.status === "F" ? "none" : "inline-block"
                                            },
                                            on: {
                                                click: () => {
                                                    this.$Modal.info({
                                                        title: '审批评语',
                                                        content: params.row.leaderComment
                                                    });
                                                }
                                            }
                                        },
                                        "审批评语"
                                    )
                                      
                                ]);
                            }
                        }
                    ]
                }
            };
        },
        methods: {
            // 搜索
            handleSearch() {
                this.initData();
            },
            // 点击分页
            changePage(page) {
                console.log(page);
                // this.tableList.index = page;
                this.initData();
            },
            // 转换搜索的值
            transformSearchList() {
                let newSearchList = {};
                for (let ind in this.searchList) {
                    newSearchList[ind] = this.searchList[ind].val;
                }
                return newSearchList;
            },
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
                this.loading = true;
                getApplyLeaveInfo({
                    pageIndex: this.tableList.index,
                    pageSize: this.tableList.pageSize,
                    searchList: newSearchList
                }).then(res => {
                    console.log(res);
                      this.loading = false;
                    this.tableList.contentList = res.result;
                    this.tableList.total = res.total;
                });
            }
        },
        mounted() {
            this.initData();
        }
    };
</script>

<style lang="less" scoped>
</style>