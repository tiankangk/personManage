<template>
<div>
    <Form ref="schoolInfo" :model="schoolInfo">
        <FormItem v-for="(item, index) in schoolInfo.items" v-if="item.status" :key="index">
            <Row :gutter="16">
                <Col span="2">
                    <FormItem
                        :prop="'items.' + index + '.schoolEduction'"
                        :rules="{required: true, message: '请选择学历', trigger: 'change'}"
                    >
                        <Select v-model="item.schoolEduction" placeholder="请选择学历">
                            <Option
                                v-for="(eduction,eductionInd) in eductionList"
                                :key="eductionInd"
                                :value="eduction"
                            >{{eduction}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem
                        :prop="'items.' + index + '.schoolName'"
                        :rules="{required: true, message: '学校名称不能为空', trigger: 'blur'}"
                    >
                        <Input type="text" v-model="item.schoolName" placeholder="请填写学校名称"></Input>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem
                        :prop="'items.' + index + '.schoolSpecial'"
                        :rules="{required: true, message: '专业不能为空', trigger: 'blur'}"
                    >
                        <Input type="text" v-model="item.schoolSpecial" placeholder="请填写专业名称"></Input>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem
                        :prop="'items.' + index + '.graduationTime'"
                        :rules="{required: true,type:'date', message: '请选择毕业时间', trigger: 'change'}"
                    >
                        <DatePicker
                            style="width:100%;"
                            type="date"
                            placeholder="请选择毕业时间"
                            v-model="item.graduationTime"
                        ></DatePicker>
                    </FormItem>
                </Col>
                <Col span="3">
                    <FormItem
                        :prop="'items.' + index + '.schoolStyle'"
                        :rules="{required: true, message: '请选择学习方式', trigger: 'change'}"
                    >
                        <Select v-model="item.schoolStyle" placeholder="请选择学习方式">
                            <Option v-for="(study,studyInd) in studyList" :key="studyInd" :value="study">{{study}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4">
                    <FormItem>
                        <Row>
                            <Col :span="10">
                                <Upload
                                    @click.native="getIndex(index)"
                                    :before-upload="handleUpload"
                                    action="//jsonplaceholder.typicode.com/posts/"
                                >
                                    <Button icon="ios-cloud-upload-outline">上传证件照</Button>
                                </Upload>
                            </Col>
                            <Col :span="14">
                                <Input  disabled type="text" v-model="item.idPhotoName">
                                     <Icon
                                type="ios-eye-outline"
                                slot="suffix"
                                @click.native="handleView(item.idPhotoUrl,index)"
                            ></Icon>
                                </Input>
                            </Col>
                        </Row>
                    </FormItem>
                </Col>

                <Col span="2">
                    <Button v-if="!id" @click="handleSchoolRemove(index)">Delete</Button>
                </Col>
            </Row>
        </FormItem>
        <FormItem v-if="!id">
            <Row>
                <Col span="2" offset="11">
                    <Button type="dashed" long @click="handleSchoolAdd">添加</Button>
                </Col>
            </Row>
        </FormItem>
    </Form>
     <Modal title="View Image" v-model="isIdPhotoModal">
            <img :src="ipPhotoPic" v-if="isIdPhotoModal" style="width: 100%">
        </Modal>
        </div>
</template>

<script>
    export default {
        name: "schoolInfo",
        props: {
            schoolInfo: {
                type: Object,
                required: true
            },
            id:{
                 type: Number
            }
        },
        data() {
            return {
                isIdPhotoModal:false,
                ipPhotoPic:'',
                schoolIndex: 1,
                uploadIndex: 1,
                eductionList: [
                    "无学历",
                    "初中",
                    "中专",
                    "高中",
                    "大专",
                    "本科",
                    "硕士",
                    "博士"
                ],
                studyList: ["统考统招", "成人教育", "自学考试", "网络教育"]
            };
        },
        methods: {
            handleView(url,index){
                this.isIdPhotoModal = true;
                this.ipPhotoPic = url?url:this.schoolInfo.items[index].idPhotoName;
            },
            handleSchoolAdd() {
                this.schoolIndex++;
                this.schoolInfo.items.push({
                    schoolEduction: "",
                    schoolName: "",
                    schoolSpecial: "",
                    graduationTime: "",
                    schoolStyle: "",
                    idPhotoFile: "",
                    index: this.schoolIndex,
                    status: 1
                });
            },
            handleSchoolRemove(index) {
                 let newSchoolInfo = { ...this.schoolInfo.items[index] };
                newSchoolInfo.status = 0;
                this.schoolInfo.items.splice(index, 1, newSchoolInfo);
                // console.log(index);
                // this.schoolInfo.items[index].status = 0;
            },
            handleUpload(file) {
                console.log(file);
                 let that = this;
                console.log("uploadIndex", this.uploadIndex);
                this.schoolInfo.items[this.uploadIndex].idPhotoFile = file;
                this.$set(
                    this.schoolInfo.items[this.uploadIndex],
                    "idPhotoName",
                    file.name
                );
                
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = e => {
                    that.$set(
                    that.schoolInfo.items[that.uploadIndex],
                    "idPhotoUrl",
                    reader.result
                );
                };
                
                console.log("items", this.schoolInfo.items);
                return false;
            },
            getIndex(index) {
                this.uploadIndex = index;
                console.log(index);
            }
        }
        ,
        mounted(){
            this.schoolIndex = this.schoolInfo.items.length +1;
        }
    };
</script>

<style lang="less" scoped>
</style>