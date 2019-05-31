
<template>
    <Form class="public-search" @submit.native.prevent inline>
        <FormItem>
            <Select
                :clearable="true"
                style="width:150px;"
                v-model="searchList.classify"
                @on-change="handleSelectClassify"
                placeholder="请选择资产分类"
            >
                <Option
                    v-for="classify in classifyList"
                    :key="classify.id"
                    :value="classify.id"
                >{{classify.name}}</Option>
            </Select>
        </FormItem>
        <FormItem prop="assetName">
            <Cascader
                v-model="searchList.assetName"
                placeholder="请选择资产名称"
                :data="assetNameList"
                change-on-select
            ></Cascader>
        </FormItem>

        <FormItem>
            <Button type="primary" @click="handleSearch">搜索</Button>
        </FormItem>
    </Form>
</template>

<script>
    import { getSelectAssetClassifyInfo, getSelectAssetName } from "api";
    import { getFormat } from "@/public/tools";

    export default {
        name: "assetSearch",
        props: {
            searchList: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                classifyList: [],
                assetNameList: []
            };
        },
        methods: {
            // 选择资产分类
            handleSelectClassify(val) {
                if (val) {
                    // 获取资产分类的数据
                    getSelectAssetName({ id: val }).then(res => {
                        let nameResult = res.nameResult;
                        this.assetNameList = getFormat(nameResult, 1);
                        this.searchList.assetName = [];
                    });
                }
            },
            // 搜索
            handleSearch() {
                this.$emit("handleSearch");
            }
        },
        mounted() {
            // 获取资产分类的数据
            getSelectAssetClassifyInfo().then(res => {
                this.classifyList = res.result;
            });
        }
    };
</script>

<style lang="less" scoped>
.public-search /deep/ .ivu-form-item {
    margin-bottom: 0;
}
</style>