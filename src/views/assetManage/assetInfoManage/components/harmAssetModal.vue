<template>
    <div>
        <Modal v-model="modal.isHarmAsset" :width="800" :mask-closable="false" title="资产报损">
            <Row class="row" :gutter="16">
                <Col span="12">
                    <Row>
                        <Col class="title" span="7">报损人:</Col>
                        <Col span="17">
                            <Select v-model="form.applyPeople" filterable>
                                <Option
                                    v-for="item in cityList"
                                    :value="item.value"
                                    :key="item.value"
                                >{{ item.label }}</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span="12">
                    <Row>
                        <Col class="title" span="7">报损时间:</Col>
                        <Col span="17">
                            <DatePicker
                                type="date"
                                :value="new Date()"
                                @on-change="chooseApplyTime"
                                placeholder="请选择报损时间"
                                style="width: 200px"
                            ></DatePicker>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Table class="table" :columns="shopTitle" :data="chooseAssetList"></Table>
            <div slot="footer">
                <Button type="text" size="large" @click="modal.isHarmAsset=false">取消</Button>
                <Button type="primary" size="large" @click="handleSubmit('addAsset')">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { getAllStaffInfo, harmGetAsset } from "api";
    import { transformTime } from "@/public/tools.js";
    export default {
        name: "getAssetModal",
        inject: ["reload"],
        props: {
            modal: {
                type: Object,
                required: true
            },
            chooseAssetList: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                form: {
                    applyPeople: "",
                    applyTime: transformTime(new Date())
                },
                cityList: [],
                shopTitle: [
                    {
                        title: "资产编码",
                        key: "id"
                    },
                    {
                        title: "资产名称",
                        key: "name"
                    },
                    {
                        title: "规格",
                        key: "norm"
                    },
                    {
                        title: "资产数量",
                        key: "num"
                    },
                    {
                        title: "报损数量",
                        width: 80,
                        align: "center",
                        render: (h, params) => {
                            return h("Input", {
                                props: {
                                    value: params.row.SL
                                },
                                on: {
                                    "on-blur": e => {
                                        let row = params.row;
                                        let reg = /^[1-9]\d*$/g;
                                        console.log('row.num',row.num);
                                        console.log('e.target.value',e.target.value);
                                        if (!reg.test(e.target.value)) {
                                            this.$Message.error("请输入正整数");
                                            e.target.value = "";
                                        } else if (Number(e.target.value) > Number(row.num)){
                                            this.$Message.error("报损数量不能大于资产数量");
                                            e.target.value = row.num;
                                        }
                                        row.SL = e.target.value;
                                        this.chooseAssetList[params.index] = row;
                                    }
                                }
                            });
                        }
                    },
                    {
                        title: "备注",
                        width: 120,
                        align: "center",
                        render: (h, params) => {
                            return h("Input", {
                                props: {
                                    value: params.row.BZ
                                },
                                on: {
                                    "on-blur": e => {
                                        params.row.BZ = e.target.value;
                                        this.chooseAssetList[params.index] =
                                            params.row;
                                    }
                                }
                            });
                        }
                    }
                ]
            };
        },
        methods: {
            // 选择日期，把格式化后的日期赋值
            chooseApplyTime(time) {
                this.form.applyTime = time;
            },
            // 判断报损资产的数量有没有空值
            registerSl() {
                return this.chooseAssetList.every(item => item.SL);
            },
            // 验证提交的值
            registerSubmitVal() {
                let result = true;
                if (!this.form.applyPeople) {
                    this.$Message.warning("报损人不能为空！");
                    result = false;
                } else if (!this.form.applyTime) {
                    this.$Message.warning("请选择报损时间！");
                    result = false;
                } else if (!this.registerSl()) {
                    this.$Message.warning("报损的数量不能为空！");
                    result = false;
                }
                return result;
            },
            // 获取要提交的数据
            getData() {
                let assetList = this.chooseAssetList.map(item => {
                    return { id: item.id,ZCSL:item.num ,SL: item.SL, BZ: item.BZ };
                });
                return {
                    applyPeople: this.form.applyPeople,
                    applyTime: this.form.applyTime,
                    assetList
                };
            },
            // 提交表单
            handleSubmit() {
                console.log(this.form.applyTime);
                console.log(this.chooseAssetList);
                if (this.registerSubmitVal()) {
                    harmGetAsset(this.getData()).then(res => {
                        console.log(res);
                        if (res.success) {
                            this.$Message.success("报损成功");
                            this.reload();
                        } else {
                            this.$Message.error("报损失败");
                        }
                    });
                }
            },
            initAllStaff() {
                getAllStaffInfo().then(res => {
                    console.log("res", res);
                    if (0 in res.result) {
                        this.cityList = res.result.map(item => {
                            return {
                                value: item.id,
                                label: item.username + "-" + item.name
                            };
                        });
                    }
                });
            }
        },
        mounted() {
            this.initAllStaff();
        }
    };
</script>

<style lang="less" scoped>
.title {
    line-height: 32px;
    text-align: center;
}
.table {
    margin-top: 10px;
}
.row {
    width: 70%;
    margin: 0 !important;
}
</style>