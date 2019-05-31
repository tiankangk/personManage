<template>
    <div>
        <Modal
            v-model="modal.isAddModal"
            @on-visible-change="modalChange"
            :mask-closable="false"
            width="900"
            title="添加资产"
        >
            <Form ref="addAsset" :rules="ruleaddAsset" :model="addAsset" :label-width="80">
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="资产分类" prop="classify">
                            <Select
                                v-model="addAsset.classify"
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
                    </Col>
                    <Col span="8">
                        <FormItem prop="assetName" label="资产名称">
                            <Cascader
                                @on-change="handleChooseName"
                                v-model="addAsset.assetName"
                                :placeholder="addAsset.name?addAsset.name:'请选择资产名称'"
                                :data="assetNameList"
                                change-on-select
                            ></Cascader>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="资产品牌" prop="brand">
                            <Input v-model="addAsset.brand" placeholder="请填写资产名称"></Input>
                        </FormItem>
                    </Col>
                </Row>

                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="规格" prop="norm">
                            <Input v-model="addAsset.norm" placeholder="请填写规格"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="型号" prop="model">
                            <Input v-model="addAsset.model" placeholder="请填写型号"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="计量单位" prop="unit">
                            <Input v-model="addAsset.unit" placeholder="请填写计量单位"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="制造商" prop="makeBusiness">
                            <Input v-model="addAsset.makeBusiness" placeholder="请填写制造商"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="用途" prop="purpose">
                            <Input v-model="addAsset.purpose" placeholder="请填写用途"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="配置" prop="config">
                            <Input v-model="addAsset.config" placeholder="请填写配置"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="资产材质" prop="material">
                            <Input v-model="addAsset.material" placeholder="请填写资产名称"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="资产类型" prop="type">
                            <Select v-model="addAsset.type" placeholder="请选择资产类型">
                                <Option
                                    v-for="type in typeList"
                                    :key="type.value"
                                    :value="type.value"
                                >{{type.label}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="资产状态" prop="shopStatus">
                            <Select v-model="addAsset.shopStatus" placeholder="请选择资产状态">
                                <Option
                                    v-for="status in statusList"
                                    :key="status.value"
                                    :value="status.value"
                                >{{status.label}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="保养周期" prop="keepTime">
                            <Input v-model="addAsset.keepTime" placeholder="请填写保养周期">
                                <span slot="append">月</span>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="购置日期" prop="buyTime">
                            <DatePicker
                                style="width:100%;"
                                type="date"
                                format="yyyy-MM-dd"
                                placeholder="请选择购置日期"
                                v-model="addAsset.buyTime"
                            ></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="保修期限" prop="repairTime">
                            <Input v-model="addAsset.repairTime" placeholder="请填写保修期限">
                                <span slot="append">月</span>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="数量" prop="num">
                            <Input v-model="addAsset.num" placeholder="请填写数量"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="单价" prop="price">
                            <Input v-model="addAsset.price" placeholder="请填写单价"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="购置人" prop="buyPeople">
                            <Input v-model="addAsset.buyPeople" placeholder="请填写购置人"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="商家名称" prop="businessName">
                            <Input v-model="addAsset.businessName" placeholder="请填写商家名称"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="联系人" prop="connectName">
                            <Input v-model="addAsset.connectName" placeholder="请填写联系人"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="联系电话" prop="connectPhone">
                            <Input v-model="addAsset.connectPhone" placeholder="请填写联系电话"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="出厂编号" prop="outNum">
                            <Input v-model="addAsset.outNum" placeholder="请填写出厂编号"></Input>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="保养方式" prop="keepStyle">
                            <Select v-model="addAsset.keepStyle" placeholder="请选择保养方式">
                                <Option
                                    v-for="style in keepStyleList"
                                    :key="style.value"
                                    :value="style.value"
                                >{{style.label}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <Row>
                            <Col :span="8">
                                <Upload
                                    :show-upload-list="false"
                                    :before-upload="handleUploadinvoice"
                                    action="//jsonplaceholder.typicode.com/posts/"
                                >
                                    <Button icon="ios-cloud-upload-outline">上传发票</Button>
                                </Upload>
                            </Col>
                            <Col :span="16">
                                <Input disabled type="text" v-model="invoiceInfo.invoiceName">
                                    <Icon
                                        type="ios-eye-outline"
                                        slot="suffix"
                                        @click.native="handleView"
                                    ></Icon>
                                </Input>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="8">
                        <FormItem label="资产来源" prop="assetSource">
                            <Select v-model="addAsset.assetSource" placeholder="请选择资产来源">
                                <Option
                                    v-for="assetSource in assetSourceList"
                                    :key="assetSource.value"
                                    :value="assetSource.value"
                                >{{assetSource.label}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Divider v-if="isConfig">配置信息</Divider>
                <FormItem
                    v-for="(config,ind) in addAsset.configList"
                    :key="ind"
                    :label="config.name"
                >
                    <Row :gutter="16">
                        <Col span="7">
                            <FormItem
                                :rules="{required: true, message: '品牌不能为空', trigger: 'blur'}"
                                :prop="'configList.'+ind+'.brand'"
                            >
                                <Input placeholder="请填写品牌" v-model="config.brand"></Input>
                            </FormItem>
                        </Col>
                        <Col span="7">
                            <FormItem
                                :rules="{required: true, message: '名称不能为空', trigger: 'blur'}"
                                :prop="'configList.'+ind+'.normal'"
                            >
                                <Input placeholder="请填写名称" v-model="config.normal"></Input>
                            </FormItem>
                        </Col>
                        <Col span="7">
                            <FormItem
                                :rules="{required: true,type:'number', message: '数量不能为空', trigger: 'blur'}"
                                :prop="'configList.'+ind+'.num'"
                            >
                                <Input :number="true" placeholder="请填写数量" v-model="config.num"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                </FormItem>
            </Form>

            <div slot="footer">
                <Button type="text" size="large" @click="modal.isAddModal=false">取消</Button>
                <Button
                    type="primary"
                    size="large"
                    :loading="loading"
                    @click="handleSubmit('addAsset')"
                >
                    <span v-if="!loading">确定</span>
                    <span v-else>Loading...</span>
                </Button>
            </div>
        </Modal>
        <Modal title="预览图片" v-model="isInvoiceModal">
            <img :src="invoiceInfo.invoiceUrl" style="width: 100%">
        </Modal>
    </div>
</template>

<script>
    import {
        getSelectAssetClassifyInfo,
        addAssetInfo,
        getSelectAssetName,
        getAssetConfigInfo
    } from "api";
    import { transformTime, getFormat } from "@/public/tools";
    export default {
        name: "addAssetModal",
        inject: ["reload"],
        props: {
            modal: {
                type: Object,
                require: true
            },
            addAsset: {
                type: Object,
                required: true
            },
            invoiceInfo: {
                type: Object,
                required: true
            }
        },
        data() {
            const validatePhone = (rule, value, callback) => {
                let reg = /^1[345678][0-9]\d{8}$/;
                if (value === "") {
                    callback(new Error("请输入联系电话"));
                } else {
                    if (!reg.test(value)) {
                        callback(new Error("电话格式不正确"));
                    }
                    callback();
                }
            };
            const validateInt = (rule, value, callback) => {
                let reg = /^[1-9]\d*$/;
                if (value === "") {
                    callback(new Error("请输入内容"));
                } else {
                    if (!reg.test(value)) {
                        callback(new Error("格式不正确"));
                    }
                    callback();
                }
            };
            const validateTime = (rule, value, callback) => {
                let reg = /^([1-9][0-9]*)+(\.[0-9]{1,2})?$/;
                if (value === "") {
                    callback(new Error("内容不能为空"));
                } else {
                    if (!reg.test(value)) {
                        callback(new Error("格式不正确"));
                    }
                    callback();
                }
            };
            return {
                classifyList: [],
                oneClassifyList: [],
                twoClassifyList: [],
                threeClassifyList: [],
                assetNameList: [],
                loading: false,
                typeList: [
                    { value: 1, label: "固定" },
                    { value: 2, label: "虚拟" },
                    { value: 3, label: "流动" },
                    { value: 4, label: "其他" }
                ],
                assetSourceList: [
                    { value: 1, label: "购置" },
                    { value: 2, label: "赠送" },
                    { value: 3, label: "继承" }
                ],
                statusList: [
                    { value: 1, label: "使用" },
                    { value: 2, label: "停用" },
                    { value: 3, label: "备用" },
                    { value: 4, label: "故障" },
                    { value: 5, label: "维修" },
                    { value: 6, label: "报废" },
                    { value: 7, label: "闲置" },
                    { value: 8, label: "调剂" }
                ],
                keepStyleList: [
                    { value: 1, label: "清洁" },
                    { value: 2, label: "紧固" },
                    { value: 3, label: "调整" },
                    { value: 4, label: "润滑" },
                    { value: 5, label: "防腐" },
                    { value: 6, label: "加压" },
                    { value: 7, label: "添料" },
                    { value: 8, label: "换油" }
                ],
                isInvoiceModal: false,

                ruleaddAsset: {
                    assetName: [
                        {
                            required: true,
                            type: "array",
                            message: "请选择资产名称",
                            trigger: "change"
                        }
                    ],
                    model: [
                        {
                            required: true,
                            message: "请您填写型号",
                            trigger: "blur"
                        }
                    ],
                    name: [
                        {
                            required: true,
                            message: "请您填写资产名称",
                            trigger: "blur"
                        }
                    ],
                    brand: [
                        {
                            required: true,
                            message: "请您资产品牌",
                            trigger: "blur"
                        }
                    ],
                    material: [
                        {
                            required: true,
                            message: "请您填写资产材质",
                            trigger: "blur"
                        }
                    ],
                    norm: [
                        {
                            required: true,
                            message: "请您填写规格/型号",
                            trigger: "blur"
                        }
                    ],
                    unit: [
                        {
                            required: true,
                            message: "请填写计量单位",
                            trigger: "blur"
                        }
                    ],
                    outNum: [
                        {
                            required: true,
                            message: "请填写出厂编号",
                            trigger: "blur"
                        }
                    ],
                    makeBusiness: [
                        {
                            required: true,
                            message: "请您填写制造商",
                            trigger: "blur"
                        }
                    ],
                    purpose: [
                        {
                            required: true,
                            message: "请填写用途",
                            trigger: "blur"
                        }
                    ],
                    config: [
                        {
                            required: true,
                            message: "请填写配置",
                            trigger: "blur"
                        }
                    ],
                    classify: [
                        {
                            required: true,
                            type: "number",
                            message: "请您选择资产分类",
                            trigger: "change"
                        }
                    ],

                    type: [
                        {
                            required: true,
                            type: "number",
                            message: "请选择资产类型",
                            trigger: "change"
                        }
                    ],
                    shopStatus: [
                        {
                            required: true,
                            type: "number",
                            message: "请选择资产状态",
                            trigger: "change"
                        }
                    ],
                    keepStyle: [
                        {
                            required: true,
                            type: "number",
                            message: "请选择保养方式",
                            trigger: "change"
                        }
                    ],
                    keepTime: [
                        {
                            validator: validateTime,
                            trigger: "blur"
                        }
                    ],
                    buyTime: [
                        {
                            required: true,
                            type: "date",
                            message: "请选择购置日期",
                            trigger: "change"
                        }
                    ],
                    repairTime: [
                        {
                            validator: validateTime,
                            trigger: "blur"
                        }
                    ],
                    num: [
                        {
                            validator: validateInt,
                            trigger: "blur"
                        }
                    ],
                    price: [
                        {
                            validator: validateTime,
                            trigger: "blur"
                        }
                    ],
                    buyPeople: [
                        {
                            required: true,
                            message: "请您填写购置人",
                            trigger: "blur"
                        }
                    ],
                    businessName: [
                        {
                            required: true,
                            message: "请您填写商家名称",
                            trigger: "blur"
                        }
                    ],
                    connectName: [
                        {
                            required: true,
                            message: "请您填写联系人",
                            trigger: "blur"
                        }
                    ],
                    connectPhone: [
                        {
                            validator: validatePhone,
                            trigger: "blur"
                        }
                    ],
                    assetSource: [
                        {
                            required: true,
                            type: "number",
                            message: "请选择资产来源",
                            trigger: "change"
                        }
                    ]
                }
            };
        },
        computed: {
            isConfig() {
                return 0 in this.addAsset.configList;
            }
        },
        methods: {
            // 选择分类名称
            handleChooseName(val) {
                console.log("chooseName", val[0]);
                 if (0 in val) {
                    // 获取资产分类的数据
                    getAssetConfigInfo({ id: val[0] }).then(res => {
                        console.log(res);
                        this.addAsset.configList = res.result;
                       
                        this.addAsset.configList.forEach(item => {

                             this.$set(item, "assetId",this.addAsset.id );
                            this.$set(item, "brand", "");
                            this.$set(item, "normal", "");
                            this.$set(item, "num", "");
                        });
                        console.log(this.configList);
                    });
                }
            },
            // 选择资产分类
            handleSelectClassify(val) {
                if (val) {
                    // 获取资产分类的数据
                    getSelectAssetName({ id: val }).then(res => {
                        let nameResult = res.nameResult;
                        this.assetNameList = getFormat(nameResult, 1);
                        this.addAsset.assetName = [];
                    });
                }
            },
            // 模态框显示隐藏触发的
            modalChange(val) {
                if (!val) {
                    this.$refs["addAsset"].resetFields();
                    this.addAsset.configList = [];
                    this.invoiceInfo.invoiceName = "";
                    this.invoiceInfo.invoiceUrl = "";
                }
            },
            // 上传后预览图片
            handleView() {
                if (this.invoiceInfo.invoiceName) {
                    this.isInvoiceModal = true;
                } else {
                    this.$Message.warning("没有能预览的图片");
                }
            },
            // 上传图片
            handleUploadinvoice(file) {
                let that = this;
                this.addAsset.invoiceFile = file;
                this.invoiceInfo.invoiceName = file.name;
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = e => {
                    that.invoiceInfo.invoiceUrl = reader.result; //reader.result是base64格式的图片
                };
            },
            handleSubmit(name) {
                this.$refs[name].validate(valid => {
                    console.log(valid);
                    if (valid) {
                        console.log(this.addAsset);

                        let newAddAsset = { ...this.addAsset };
                        let params = new FormData();
                        params.append("invoiceFile", newAddAsset.invoiceFile);
                        delete newAddAsset.invoiceFile;
                        newAddAsset.buyTime = transformTime(newAddAsset.buyTime);
                        params.append("addAsset", JSON.stringify(newAddAsset));
                        this.loading = true;
                        addAssetInfo(params).then(res => {
                            console.log(res);
                            if (res.success) {
                                this.reload();
                                this.$Message.success("提交成功");
                            } else {
                                this.$Message.error("提交失败");
                            }
                            this.loading = false;
                        });
                    }
                });
            }
        },
        mounted() {
            // 获取资产分类的数据
            getSelectAssetClassifyInfo().then(res => {
                console.log("resassdfasdfas", res);

                this.classifyList = res.result;
            });
        }
    };
</script>

<style lang="less" scoped>
</style>