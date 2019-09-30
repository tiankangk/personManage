<template>
    <div>
        <Card>
            <div class="header-content">
                <asset-search @handleSearch="handleSearch" :searchList="searchList"></asset-search>
            </div>
        </Card>
        <public-table
            :loading="loading"
            class="puclic-table"
            :tableList="tableList"
            @changePage="changePage"
        ></public-table>
        <apply-leave-model :model="model" :userInfo="userInfo"></apply-leave-model>
    </div>
</template>

<script>
    import assetSearch from "./components/assetSearch";
    import applyLeaveModel from "./components/applyLeaveModel";
    // import publicSearch from "components/publicSearch";
    import publicTable from "components/publicTable";
    import { getAssetClaimInfo, returnAssets } from "api";
    import { transformTime } from "@/public/tools";
    export default {
        name: "getAsset",
        inject: ["reload"],
        components: {
            // publicSearch,
            assetSearch,
            publicTable,
            applyLeaveModel
        },
        data() {
            return {
                loading: false,
                userInfo: {},
                searchList: {
                    username: "",
                    classify: "",
                    assetName: [],
                    applyTime: []
                },
                model: {
                    isApplyLeaveModel: false
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
                                    `${this.formatEndCharacter(params.row.part)}`
                                );
                            }
                        },
                        {
                            title: "资产名称",
                            render: (h, params) => {
                                return h(
                                    "div",
                                    `${this.formatEndCharacter(params.row.ZCMC)}`
                                );
                            }
                        },
                        {
                            title: "申领数量",
                            key: "SL"
                        },

                        {
                            title: "申领时间",
                            render: (h, params) => {
                                return h("div", params.row.applyTime.split("T")[0]);
                            }
                        },
                        {
                            title: "归还时间",
                            render: (h, params) => {
                                return h(
                                    "div",
                                    {
                                        style: {
                                            color:
                                                params.row.returnTime &&
                                                params.row.returnTime.indexOf(
                                                    "1900"
                                                ) === -1
                                                    ? ""
                                                    : "red"
                                        }
                                    },
                                    params.row.returnTime &&
                                        params.row.returnTime.indexOf("1900") === -1
                                        ? params.row.returnTime.split("T")[0]
                                        : "未归还"
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
                                                display:
                                                    params.row.status === "F"
                                                        ? "inline-block"
                                                        : "none"
                                            },
                                            on: {
                                                click: () => {
                                                    this.$Modal.confirm({
                                                        title: "提示",
                                                        content: "确定要归还吗？",
                                                        onOk: () => {
                                                            let row = params.row;
                                                            returnAssets({
                                                                id: row.id,
                                                                SL: row.SL,
                                                                assetId: row.assetId
                                                            }).then(res => {
                                                                console.log(res);
                                                                if (res.success) {
                                                                    this.reload();
                                                                    this.$Message.success(
                                                                        "归还成功"
                                                                    );
                                                                } else {
                                                                    this.$Message.error(
                                                                        "归还失败"
                                                                    );
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            }
                                        },
                                        "归还"
                                    ),

                                    h(
                                        "Button",

                                        {
                                            props: {
                                                type: "info",
                                                size: "small"
                                            },
                                            style: {
                                                marginLeft: "5px"
                                            },
                                            on: {
                                                click: () => {
                                                    this.$Modal.info({
                                                        title: "备注",
                                                        content: params.row.BZ
                                                    });
                                                }
                                            }
                                        },
                                        "查看备注"
                                    )
                                ]);
                            }
                        }
                    ]
                }
            };
        },
        methods: {
            // 过滤以-结尾的字符串
            formatEndCharacter(str) {
                if (str) {
                    return str
                        .split("-")
                        .filter(item => item)
                        .join("-");
                } else {
                    return str;
                }
            },
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
                this.loading = true;
                getAssetClaimInfo({
                    pageIndex: this.tableList.index,
                    pageSize: this.tableList.pageSize,
                    searchList: this.searchList
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