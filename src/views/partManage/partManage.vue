<template>
    <div>
        <Card class="header-container">
            <Button type="primary" @click="handleAddCompany">添加公司</Button>
        </Card>
        <tree-table
            :data="data"
            :columns="columns"
            @addChild="addChild"
            @handleEdit="handleEdit"
            @handelStatus="handelStatus"
            border
        />
        <add-company-modal :modal="modal" :parantInfo="parantInfo"></add-company-modal>
    </div>
</template>
<script>
    import treeTable from "@/components/treeTable";
    import addCompanyModal from "./components/addCompanyModal";
    import { getCompanyInfo, changeCompanyStauts } from "api";
    export default {
        name:'partManage',
        components: {
            treeTable,
            addCompanyModal
        },
        inject:['reload'],
        methods: {
            edit(row) {
                // console.log("row", row);
            }
        },
        data() {
            return {
                parantInfo: {},
                modal: {
                    isAddCompany: false
                },
                columns: [
                    {
                        text: "名称",
                        value: "name"
                    }
                ],
                data: []
            };
        },
        methods: {
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

                        changeCompanyStauts(newRow).then(res => {
                            this.reload();
                        });
                    }
                });
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
            initData() {
                getCompanyInfo().then(res => {
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
                    }
                });
            }
        },
        mounted() {
            this.initData();
        }
    };
</script>
<style lang="less" scoped>
.header-container {
    margin-bottom: 10px;
}
</style>
