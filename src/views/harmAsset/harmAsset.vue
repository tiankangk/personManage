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
    import publicTable from "components/publicTable";
    import { getHarmAssetInfo, returnAssets } from "api";
    import { transformTime } from "@/public/tools";
    export default {
        name: "harmAsset",
        inject: ["reload"],
        components: {
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
                            title: "报损数量",
                            key: "SL"
                        },

                        {
                            title: "报损时间",
                            render: (h, params) => {
                                return h("div", params.row.harmTime?params.row.harmTime.split("T")[0]:'');
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
                getHarmAssetInfo({
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