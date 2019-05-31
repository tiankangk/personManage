<template>
    <div>
        <Card>
            <div class="header-content">
                <asset-search @handleSearch="handleSearch" :searchList="searchList"></asset-search>
                <Button @click="handleAddAsset" type="primary">添加资产</Button>
            </div>
        </Card>
        <public-table
            :loading="loading"
            class="puclic-table"
            :tableList="tableList"
            @changePage="changePage"
        ></public-table>
        <add-asset-modal :modal="modal" :addAsset="addAsset" :invoiceInfo="invoiceInfo"></add-asset-modal>
    </div>
</template>

<script>
    import assetSearch from "./components/assetSearch";
    import publicTable from "components/publicTable";
    import addAssetModal from "./components/addAssetModal";
    import { getAssetInfo } from "api";
    import { transformTime } from "@/public/tools";
    export default {
        name: "assetInfoManage",
        components: {
            assetSearch,
            publicTable,
            addAssetModal
        },
        data() {
            return {
                loading: false,
                userInfo: {},
                modal: {
                    isAddModal: false
                },
                searchList: {
                    classify: "",
                    assetName: []
                },
                // 用来保存证明的图片地址和图片名称
                invoiceInfo: {
                    invoiceUrl: "",
                    invoiceName: ""
                },
                // 添加资产
                addAsset: {
                    configList: [],
                    assetName: [],
                    // oneName: "",
                    model: "",
                    // twoName: "",
                    // threeName: "",
                    brand: "",
                    material: "",
                    norm: "",
                    unit: "",
                    outNum: "",
                    makeBusiness: "",
                    purpose: "",
                    config: "",
                    classify: "",
                    type: "",
                    shopStatus: "",
                    keepStyle: "",
                    keepTime: "",
                    buyTime: "",
                    repairTime: "",
                    num: "",
                    price: "",
                    buyPeople: "",
                    businessName: "",
                    connectName: "",
                    connectPhone: "",
                    assetSource: "",
                    invoiceFile: ""
                },
                tableList: {
                    total: 1,
                    index: 1,
                    pageSize: 10,
                    contentList: [],
                    titleList: [
                        {
                            title: "资产编码",
                            key: "id"
                        },
                        {
                            title: "名称",
                            key: "name"
                        },
                        {
                            title: "品牌",
                            key: "brand"
                        },
                        {
                            title: "规格",
                            key: "norm"
                        },
                        {
                            title: "数量",
                            key: "num"
                        },

                        {
                            title: "型号",
                            key: "model"
                        },
                        {
                            title: "出厂编号",
                            key: "outNum"
                        },
                        {
                            title: "制造商",
                            key: "makeBusiness"
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
                                            on: {
                                                click: () => {
                                                    console.log(params.row);
                                                    this.modal.isAddModal = true;
                                                    let newAddAsset = {
                                                        ...params.row
                                                    };
                                                    newAddAsset.assetName = newAddAsset.assetName.split(
                                                        ","
                                                    );
                                                    newAddAsset.action = 'edit';
                                                    this.invoiceInfo.invoiceName =
                                                        newAddAsset.invoiceUrl ||
                                                        "";
                                                    this.invoiceInfo.invoiceUrl =
                                                        newAddAsset.invoiceUrl ||
                                                        "";
                                                    this.addAsset = newAddAsset;
                                                    console.log(params.row);
                                                }
                                            }
                                        },
                                        "编辑"
                                    )
                                ]);
                            }
                        }
                    ]
                }
            };
        },
        methods: {
            // 添加资产
            handleAddAsset() {
                this.addAsset.action = 'add';
                this.modal.isAddModal = true;
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

            initData() {
                this.loading = true;
                getAssetInfo({
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
.header-content {
    display: flex;
    justify-content: space-between;
}
</style>