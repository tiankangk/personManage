<template>
    <div class="classify-manage">
        <Row :gutter="16">
            <Col span="4" style="height:100%;">
                <Card class="header-container">
                    <Button type="primary" class="add-classify-btn" @click="handleAddClassify">添加分类</Button>
                    <Menu style="width:100%;" active-name="0">
                        <MenuItem
                            @click.native="chooseClassify(item)"
                            v-for="(item,ind) in classifyInfoList"
                            :key="ind"
                            class="menu-item"
                            :name="ind+''"
                        >
                            <span>{{item.name}}</span>
                            <div>
                                <Icon @click="handleEditClassify(item)" type="md-create" />
                                <Icon
                                    @click="handleChangeClassifyStauts(item)"
                                    style="margin-left:5px;"
                                    :type="item.status==='T'?'ios-unlock':'ios-lock'"
                                />
                            </div>
                        </MenuItem>
                    </Menu>
                </Card>
            </Col>
            <Col span="20">
                <Tabs :animated="false" value="name1">
                    <TabPane label="资料名称管理" name="name1">
                        <div class="add-container">
                            <Icon class="add-icon" @click="handleAddCompany" type="md-add-circle" />
                        </div>
                        <tree-table
                            :data="data"
                            :columns="columns"
                            @addChild="addChild"
                            @handleEdit="handleEdit"
                            @handelStatus="handelStatus"
                            border
                        />
                    </TabPane>
                    <TabPane label="配置管理" name="name2">
                        <div class="add-container">
                            <Select
                                placeholder="请选择要添加配置的资料名称"
                                v-model="chooseName"
                                style="width:200px"
                                @on-change="handleChooseName"
                            >
                                <Option
                                    v-for="item in nameList"
                                    :value="item.id"
                                    :key="item.id"
                                >{{ item.name }}</Option>
                            </Select>
                            <Button @click="handleAddConfig" type="primary">添加配置</Button>
                            <!-- <Icon class="add-icon" @click="handleAddConfig" type="md-add-circle"/> -->
                        </div>
                        <Table border :columns="titleList" :data="configData"></Table>
                    </TabPane>
                </Tabs>
            </Col>
        </Row>

        <add-classify-modal
            :modal="modal"
            :classifyInfo="classifyInfo"
            @updateClassify="updateClassify"
        ></add-classify-modal>
        <add-name-modal
            :modal="modal"
            @updateAssetName="updateAssetName"
            :parantInfo="parantInfo"
            :chooseClassifyVal="chooseClassifyVal"
        ></add-name-modal>
        <add-config-modal
            @updateConfig="updateConfig"
            :modal="modal"
            :chooseName="chooseName"
            :configInfo="configInfo"
        ></add-config-modal>
    </div>
</template>
<script>
    import treeTable from "@/components/treeTable";
    import addClassifyModal from "./components/addClassifyModal";
    import addNameModal from "./components/addNameModal";

    import addConfigModal from "./components/addConfigModal";
    import {
        getAssetClassifyInfo,
        changeClassifyStauts,
        getAssetNameInfo,
        changeCompanyStauts,
        changeAssetNameStauts,
        getAssetConfigInfo,
        changeConfigStauts,
        getFirstLevelInfo
    } from "api";
    export default {
        name: "classifyManage",
        components: {
            treeTable,
            addClassifyModal,
            addNameModal,

            addConfigModal
        },
        inject: ["reload"],

        data() {
            return {
                chooseName: "",
                chooseClassifyVal: {},
                parantInfo: {},

                configInfo: {
                    name: ""
                },
                classifyInfo: {
                    name: ""
                },
                nameList: [],
                classifyInfoList: [{ id: 0, name: "" }],
                modal: {
                    isAddClassify: false,
                    isAddCompany: false,
                    isAddConfig: false
                },
                columns: [
                    {
                        text: "名称",
                        value: "name"
                    }
                ],
                data: [],
                titleList: [
                    {
                        title: "名称",
                        key: "name"
                    },
                    {
                        title: "状态",
                        render: (h, params) => {
                            return h(
                                "div",
                                {
                                    style: {
                                        color:
                                            params.row.status === "T"
                                                ? "green"
                                                : "red"
                                    }
                                },
                                params.row.status === "T" ? "启用" : "禁用"
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
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.modal.isAddConfig = true;
                                                this.configInfo = { ...params.row };
                                            }
                                        }
                                    },
                                    "编辑"
                                ),
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type:
                                                params.row.status === "T"
                                                    ? "error"
                                                    : "success",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.$Modal.confirm({
                                                    title: "提示",
                                                    content: `确定要${
                                                        params.row.status === "T"
                                                            ? "禁用"
                                                            : "启用"
                                                    }吗`,
                                                    onOk: () => {
                                                        changeConfigStauts(
                                                            params.row
                                                        ).then(res => {
                                                            console.log(res);
                                                            if (res.success) {
                                                                this.$Message.success(
                                                                    `${
                                                                        params.row
                                                                            .status ===
                                                                        "T"
                                                                            ? "禁用"
                                                                            : "启用"
                                                                    }成功`
                                                                );
                                                                this.updateConfig();
                                                            } else {
                                                                this.$Message.success(
                                                                    `${
                                                                        params.row
                                                                            .status ===
                                                                        "T"
                                                                            ? "禁用"
                                                                            : "启用"
                                                                    }失败`
                                                                );
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    params.row.status === "T" ? "禁用" : "启用"
                                )
                            ]);
                        }
                    }
                ],
                configData: []
            };
        },

        methods: {
            // 添加配置
            handleAddConfig() {
                if (this.chooseName) {
                    this.configInfo = {
                        name: ""
                    };
                    this.modal.isAddConfig = true;
                } else {
                    this.$Message.warning("请选择要添加配置的设备");
                }
            },
            // 更新配置信息
            updateConfig() {
                this.initConfig();
            },
            // 更新资料名的内容
            updateAssetName() {
                this.initAssetName();
            },
            // 选择要配资的资产的名称
            handleChooseName() {
                this.initConfig();
            },
            // 添加子分类
            addChild(row) {
                this.modal.isAddCompany = true;
                this.parantInfo = row;
            },
            // 编辑
            handleEdit(row) {
                this.modal.isAddCompany = true;
                let newRow = { ...row };
                newRow.btn = "edit";
                this.parantInfo = newRow;
            },
            // 改变禁用和启用状态
            handelStatus(row) {
                this.$Modal.confirm({
                    title: "提示",
                    content: `确定要${row.status === "T" ? "禁用" : "启用"}吗`,
                    onOk: () => {
                        let newRow = [
                            {
                                id: row.id,
                                name: row.name,
                                pid: row.pid,
                                status: row.status,
                                type: row.type
                            }
                        ];
                        const singleFun = items => {
                            items.forEach(item => {
                                let pushList = {};
                                for (let ind in item) {
                                    if (ind !== "children") {
                                        pushList[ind] = item[ind];
                                    }
                                }
                                newRow.push(pushList);
                                if ("children" in item) {
                                    singleFun(item.children);
                                }
                            });
                        };
                        if ("children" in row) {
                            singleFun(row.children);
                        }

                        changeAssetNameStauts(newRow).then(res => {
                            this.initAssetName();
                        });
                    }
                });
            },
            //添加分类
            handleAddClassify() {
                this.classifyInfo = {
                    name: ""
                };
                this.modal.isAddClassify = true;
            },
            // 编辑分类
            handleEditClassify(row) {
                this.modal.isAddClassify = true;
                this.classifyInfo = { ...row };
            },
            // 更新分类信息
            updateClassify() {
                this.initData();
            },

            // 改变分类的状态
            handleChangeClassifyStauts(row) {
                console.log("row", row);
                this.$Modal.confirm({
                    title: "提示",
                    content: `确定要${row.status === "T" ? "禁用" : "启用"}吗`,
                    onOk: () => {
                        changeClassifyStauts(row).then(res => {
                            console.log(res);
                            if (res.success) {
                                this.$Message.success(
                                    `${row.status === "T" ? "禁用" : "启用"}成功`
                                );
                                this.initData();
                            } else {
                                this.$Message.success(
                                    `${row.status === "T" ? "禁用" : "启用"}失败`
                                );
                            }
                        });
                    }
                });
            },
            // 选择分类
            chooseClassify(row) {
                console.log("choose", row);
                this.chooseClassifyVal = { ...row };
                this.chooseName = "";
                this.configData = [];
                this.initAssetName();
                this.initConfig();
                this.initFirstLevelInfo();
            },
            // 添加公司
            handleAddCompany() {
                this.modal.isAddCompany = true;
                this.parantInfo = {};
            },
            // 通过type对获取的初始化的值分类
            classifyList(list) {
                let levelList = {};
                list.forEach(item => {
                    if (item.type in levelList) {
                        levelList[item.type].push(item);
                    } else {
                        levelList[item.type] = [];
                        levelList[item.type].push(item);
                    }
                });
                return levelList;
            },
            // 给对象的key排序
            sortKey(obj) {
                let newKey = Object.keys(obj).sort();
                let newObj = {};
                for (let item of newKey) {
                    newObj[item] = obj[item];
                }
                return newObj;
            },
            // 初始化分类下的多级名称的信息
            initAssetName() {
                console.log("chooseClassifyVal", this.chooseClassifyVal);
                getAssetNameInfo(this.chooseClassifyVal).then(res => {
                    if (0 in res.result) {
                        let levelList = this.classifyList(res.result);
                        let sortList = this.sortKey(levelList);
                        let classifyList = [];
                        sortList[1].forEach(item => {
                            classifyList.push(item);
                        });

                        const fun = item => {
                            item.children.forEach(item1 => {
                                let childrens = [];
                                sortList[item1.ind].forEach(child => {
                                    child.ind = item1.ind + 1;
                                    if (item1.id === child.pid) {
                                        childrens.push(child);
                                    }
                                });
                                item1.children = childrens;
                                if (item1.ind < Object.keys(sortList).length) {
                                    fun(item1);
                                }
                            });
                        };
                        if (Object.keys(sortList).length > 1) {
                            classifyList.forEach(item => {
                                let childrens = [];
                                sortList[2].forEach(child => {
                                    if (item.id === child.pid) {
                                        child.ind = 3;
                                        childrens.push(child);
                                    }
                                });
                                item.children = childrens;
                                if (Object.keys(sortList).length > 2) {
                                    fun(item);
                                }
                            });
                        }
                        this.data = classifyList;
                    } else {
                        this.data = [];
                    }
                });
            },
            // 初始化分类信息
            initData() {
                getAssetClassifyInfo().then(res => {
                    this.classifyInfoList = res.result;
                    if (0 in res.result) {
                        this.chooseClassifyVal = res.result[0];
                        this.initAssetName();
                        this.initConfig();
                        this.initFirstLevelInfo();
                    }
                });
            },
            initConfig() {
                if (this.chooseName) {
                    getAssetConfigInfo({ id: this.chooseName }).then(res => {
                        console.log("config", res);
                        this.configData = res.result;
                    });
                }
            },
            // 获取一级名称的信息
            initFirstLevelInfo() {
                getFirstLevelInfo(this.chooseClassifyVal).then(res => {
                    console.log(res);
                    this.nameList = res.result;
                });
            }
        },
        mounted() {
            this.initData();
        }
    };
</script>
<style lang="less" scoped>
.add-container {
    line-height: 30px;
    font-size: 30px;
    margin-top: -10px;
    margin-bottom: 6px;
    color: #2d8cf0;
    display: flex;
    .add-icon {
        cursor: pointer;
    }
}
.classify-manage {
    height: 100%;
    .header-container {
        margin-bottom: 10px;
        height: 100%;
        .menu-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .add-classify-btn {
            width: 100%;
            margin-bottom: 5px;
        }
    }
}
</style>
