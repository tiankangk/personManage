<template>
    <div>
        <Modal v-model="model.isPreviewPic" title="浏览照片">
            <Row :gutter="16">
                <Col class="bottom-distance"  v-for="(pic,ind) in previewPicList" :key="ind" span="12">
                    <Card class="card-container">
                        <img class="pic" :src="pic" alt="">
                    </Card>
                </Col>
            </Row>
            <div slot="footer">
                <Button type="primary" size="large" @click="model.isPreviewPic = false">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "previewPic",
        props:{
            model:{
                type:Object,
                required:true
            },
            previewPicList:{
                type:Array,
                require:true
            }
        }
    };
</script>

<style lang="less" scoped>
.card-container {
    height:200px;
}
.pic {
    width:100%;
    height:100%;
}
.bottom-distance {
    margin-bottom: 10px;
}
</style>