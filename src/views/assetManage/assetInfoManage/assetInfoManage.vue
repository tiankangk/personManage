<template>
    <div>
        <Card>
            <div class="header-content">
                <asset-search @handleSearch="handleSearch" :searchList="searchList"></asset-search>
                <div>
                    <Dropdown style="margin-left: 20px" @on-click="chooseAssetAction">
                        <Button type="primary">
                            资产操作
                            <Icon type="ios-arrow-down"></Icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem name="isGetAsset">资产申领</DropdownItem>
                            <DropdownItem name="isHarm">资产报损</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Button @click="handleAddAsset" type="primary">添加资产</Button>
                </div>
            </div>
        </Card>
        <public-table
            :loading="loading"
            class="puclic-table"
            :tableList="tableList"
            @handleSelect="handleSelect"
            @changePage="changePage"
        ></public-table>
        <!-- 添加资产弹框 -->
        <add-asset-modal :modal="modal" :addAsset="addAsset" :invoiceInfo="invoiceInfo"></add-asset-modal>
        <!-- 资产申领弹框 -->
        <get-asset-modal :modal="modal" :chooseAssetList="chooseAssetList"></get-asset-modal>
        <!-- 资产报损弹框 -->
        <harm-asset-modal :modal="modal" :chooseAssetList="chooseAssetList"></harm-asset-modal>
    </div>
</template>

<script>
    import assetSearch from "./components/assetSearch";
    import publicTable from "components/publicTable";
    import addAssetModal from "./components/addAssetModal";
    import getAssetModal from "./components/getAssetModal";
    import harmAssetModal from "./components/harmAssetModal";
    import { getAssetInfo } from "api";
    import { transformTime } from "@/public/tools";
    export default {
        name: "assetInfoManage",
        components: {
            assetSearch,
            publicTable,
            addAssetModal,
            getAssetModal,
            harmAssetModal
        },
        data() {
            return {
                loading: false,
                userInfo: {},
                modal: {
                    isAddModal: false,
                    isGetAsset: false,
                    isHarmAsset: false
                },
                chooseAssetList: [],
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
                            type: "selection",
                            width: 60,
                            align: "center"
                        },
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
                                                    newAddAsset.action = "edit";
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
            // table多选值
            handleSelect(list) {
                this.chooseAssetList = list;
                this.chooseAssetList.forEach(item => {
                    this.$set(item, "SL", "");
                    this.$set(item, "BZ", "");
                });
                console.log("chooseAssetList", this.chooseAssetList);
            },
            // 添加资产
            handleAddAsset() {
                this.addAsset.action = "add";
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
            // 资产操作
            chooseAssetAction(val) {
                if (0 in this.chooseAssetList) {
                    if (val === "isGetAsset") {
                        // 资产申领
                        this.modal.isGetAsset = true;
                    } else if (val === "isHarm") {
                        // 资产报损
                        this.modal.isHarmAsset = true;
                    }
                } else {
                    this.$Message.warning("请选择资产");
                }
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