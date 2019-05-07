<template>
    <div>
        <Card>
            <div class="header-content">
                <public-search :searchList="searchList" @handleSearch="handleSearch"></public-search>
            </div>
        </Card>
        <public-table class="puclic-table" :tableList="tableList" @changePage="changePage"></public-table>
        <selling-off-model :model="model" :userInfo="userInfo"></selling-off-model>
    </div>
</template>

<script>
    import sellingOffModel from "./components/sellingOffModel";
    import publicSearch from "components/publicSearch";
    import publicTable from "components/publicTable";
    import { getApplyLeaveAgreeInfo } from "api";
    import { transformTime } from "@/public/tools";
    export default {
        name: "sellingOff",
        components: {
            publicSearch,
            publicTable,
            sellingOffModel
        },
        data() {
            return {
                userInfo: {},
                model: {
                    isSellingOffModel: false
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
                            title: "职务",
                            key: "post"
                        },
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
                                                params.row.sellingOffStatus === "F"
                                                    ? "red"
                                                    : "green"
                                        }
                                    },
                                    params.row.sellingOffStatus === "F" ? "未销假" : "已销假"
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
                                                    this.model.isSellingOffModel = true;
                                                    this.userInfo = {
                                                        id: params.row.id,
                                                        username:
                                                            params.row.username
                                                    };
                                                }
                                            }
                                        },
                                        "销假"
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
                                                        title: "备注",
                                                        content: params.row.sellingOffReason
                                                    });
                                                }
                                            }
                                        },
                                        "备注"
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
                getApplyLeaveAgreeInfo({
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