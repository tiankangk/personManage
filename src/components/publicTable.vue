<template>
    <div>
        <Table :loading="loading" class="public-table" border :columns="tableList.titleList" :data="tableList.contentList"></Table>
         <Page @on-change="changePage" :total="tableList.total" :page-size="tableList.pageSize?tableList.pageSize:10" :current="tableList.index" show-elevator show-total />
    </div>
</template>

<script>
    export default {
        name:'publicTable',
        props:{
            tableList:{
                type:Object,
                required:true
            },
            loading:{
                type:Boolean
            }
        },
        data() {
            return {
              
               
            }
        },
        methods:{
            changePage(page){
                this.tableList.index = page;
                console.log(page);
                this.$emit('changePage',page);
            }
        }
    }
</script>

<style lang="less" scoped>
    .public-table{
        margin:20px auto;
    }
</style>