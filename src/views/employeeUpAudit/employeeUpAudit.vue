<template>
    <div>
        <Card>
            <div class="header-content">
                <public-search :searchList="searchList" @handleSearch="handleSearch"></public-search>
            </div>
        </Card>
        <public-table class="puclic-table" :tableList="tableList" @changePage="changePage"></public-table>
        <employee-up-model :model="model" :userInfo="userInfo"></employee-up-model>
    </div>
</template>

<script>
    import employeeUpModel from "./components/employeeUpModel";
    import publicSearch from "components/publicSearch";
    import publicTable from "components/publicTable";
    import { getEmployeeUpInfo } from "api";
    import { transformTime } from "@/public/tools";
    export default {
        name: "employeeUpAudit",
        components: {
            publicSearch,
            publicTable,
            employeeUpModel
        },
        data() {
            return {
                userInfo: {},
                model: {
                    isAuditModel: false
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
                            key: "part"
                        },
                        {
                            title: "晋升职务",
                            key: "job"
                        },
                        {
                            title: "晋升工资",
                            key: "money"
                        },
                        {
                            title: "晋升日期",
                            render: (h, params) => {
                                return h("div", params.row.riseTime.split("T")[0]);
                            }
                        },
                        {
                            title: "考察期",
                            key: "watchTime",
                            render: (h, params) => {
                                return h("div", params.row.watchTime + "个月");
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
                                                marginRight: "5px",
                                                display:params.row.status === "F" ? "inline-block" : "none"
                                            },
                                            on: {
                                                click: () => {
                                                    console.log(params);
                                                    this.model.isAuditModel = true;
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
                                                        title: '晋升理由',
                                                        content: params.row.reason
                                                    });
                                                }
                                            }
                                        },
                                        "晋升理由"
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
                getEmployeeUpInfo({
                    pageIndex: this.tableList.index,
                    pageSize: this.tableList.pageSize,
                    searchList: newSearchList
                }).then(res => {
                    console.log(res);
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