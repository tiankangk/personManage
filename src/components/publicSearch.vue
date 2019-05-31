
<template>
    <Form class="public-search" @submit.native.prevent inline>
        <FormItem v-for="(item,ind) in searchList" :key="ind">
            <Input
                @keyup.enter.native="handleSearch"
                :style="{width:item.width?item.width:'180px'}"
                class="search-input"
                v-if="item.type === 'input'"
                v-model.trim="item.val"
                clearable
                :placeholder="'请输入'+item.title"
            />
            <Select
                @keyup.enter.native="handleSearch"
                :style="{width:item.width?item.width:'180px'}"
                class="search-input"
                :clearable="true"
                v-else-if="item.type==='select'"
                v-model="item.val"
            >
                <Option
                    class="search-input"
                    v-for="itemSelect in item.options"
                    :value="itemSelect.value"
                    :key="itemSelect.value"
                >{{ itemSelect.label }}</Option>
            </Select>
            <DatePicker
                @keyup.enter.native="handleSearch"
                :style="{width:item.width?item.width:'180px'}"
                format="yyyy-MM-dd"
                v-model="item.val"
                v-else-if="item.type==='selectTime'"
                type="daterange"
                placement="bottom-end"
                placeholder="请选择查询日期"
            ></DatePicker>
            <Cascader
                v-else
                @keyup.enter.native="handleSearch"
                :style="{width:item.width?item.width:'180px'}"
                v-model="item.val"
                :data="options"
                :placeholder="'请输入'+item.title"
                change-on-select
            ></Cascader>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSearch">搜索</Button>
        </FormItem>
    </Form>
</template>

<script>
import {getAllJob} from 'api'
import { getFormat } from "@/public/tools";
    export default {
        name: "publicSearch",
        props: {
            searchList: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                options: []
            };
        },
        methods: {
            // 搜索
            handleSearch() {
                this.$emit("handleSearch");
            }
        },
        mounted(){
            getAllJob().then(res =>{
                console.log('job',res);
                this.options = getFormat(res.result,4)
                console.log('options',this.options);
            });
        }
    };
</script>

<style lang="less" scoped>
.public-search /deep/ .ivu-form-item {
    margin-bottom: 0;
}
</style>