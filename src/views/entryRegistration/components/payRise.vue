<template>
    <div>
        <Modal v-model="model.isPayRise" :mask-closable="false" title="加薪申请">
            <Form
                ref="payRise"
                :rules="rulePayRise"
                :model="payRise"
                :label-width="80"
            >
                <FormItem label="加薪人">
                    <Input :value="chooseVal.username" disabled></Input>
                </FormItem>
                <FormItem label="加薪数额" prop="money">
                    <Input v-model="payRise.money" @on-blur="computeMoney" placeholder="请填写晋升工资"></Input>
                </FormItem>
                <FormItem label="加薪比率" >
                    <Input v-model="payRise.precent" disabled>
                     <span slot="append">%</span>
                    </Input>
                </FormItem>
                <FormItem label="加薪后工资">
                    <Input v-model="payRise.totalWage" disabled>
                    </Input>
                </FormItem>
                <FormItem label="加薪日期" prop="riseTime">
                    <DatePicker
                        type="date"
                        placeholder="请选择加薪的日期"
                        v-model="payRise.riseTime"
                    ></DatePicker>
                </FormItem>
                <FormItem label="加薪理由" prop="reason">
                    <Input
                        v-model="payRise.reason"
                        type="textarea"
                        :autosize="{minRows: 2,maxRows: 5}"
                        placeholder="请填写晋升理由"
                    ></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="model.isPayRise=false">取消</Button>
                <Button type="primary" size="large" @click="handelSubmit('payRise')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { addPayRise } from "api";
    import { transformTime } from "@/public/tools";
    import {mapMutations} from 'vuex'
    export default {
        name: "payRise",
         inject:['reload'],
        props: {
            model: {
                type: Object,
                require: true
            },
            chooseVal: {
                type: Object,
                require: true
            }
        },
        data() {
            return {
                payRise: {
                    money: "",
                    riseTime: "",
                    precent: 0,
                    reason: "",
                    totalWage:0
                },
                rulePayRise: {
                    
                    money: [
                        {
                            required: true,
                            message: "请填写加薪数额",
                            trigger: "blur"
                        }
                    ],
                    riseTime: [
                        {
                            required: true,
                            type: "date",
                            message: "请选择加薪日期",
                            trigger: "change"
                        }
                    ],
                   
                    reason: [
                        {
                            required: true,
                            message: "请填写加薪理由",
                            trigger: "blur"
                        }
                    ]
                }
            };
        },
        methods: {
              ...mapMutations(['setCountList']),
            computeMoney(){
                this.payRise.precent = (Number(this.payRise.money)/Number(this.chooseVal.wageCrrection)*100).toFixed(2);
                this.payRise.totalWage =  Number(this.payRise.money) +  Number(this.chooseVal.realWage);
            },
            handelSubmit(name) {

                this.$refs[name].validate(valid => {
                    if (valid) {
                        let newPayRise = { ...this.payRise };
                        newPayRise.riseTime = transformTime(
                            newPayRise.riseTime
                        );
                        addPayRise({
                            userId: this.chooseVal.id,
                            payRise: newPayRise
                        }).then(res => {
                            console.log(res);
                            if (res.success) {
                                // this.model.isPayRise = false;
                                  this.setCountList();
                                this.reload();
                                this.$Message.success("提交成功");
                            } else {
                                this.$Message.error("提交失败");
                            }
                        });
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
</style>