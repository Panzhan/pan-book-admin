<template>
    <div class="order-list">
        <h2 style="margin-bottom: 10px;">{{ title }}</h2>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="订单号">
                <el-input :size="commonSize" v-model="formInline.p_id" placeholder="输入订单号"></el-input>
            </el-form-item>
            <el-form-item label="订单状态">
                <el-select :size="commonSize" v-model="formInline.p_status" placeholder="选择订单状态">
                    <el-option
                        v-for="(item, key) in statusListMap"
                        :key="key"
                        :label="item"
                        :value="key"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button :size="commonSize" type="primary" @click="handleSearch">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="table_container">
            <Order-Table
                :cloumnList="cloumnList"
                :tableData="tableData"
                :leftAlian="leftAlian"
                :centerAlian="centerAlian"
                :rightAlian="rightAlian"
                :orderAlianConfig="sumOrderAlianConfig()"
                @handleCopy="handleCopy"
            ></Order-Table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import CONFIG from '@/config/orderListConfig.js'
import Table from './components/OrderTable'
export default {
    name: 'Order-Center',
    components: {
        'Order-Table': Table,
    },
    data() {
        return {
            title: '',
            commonSize: 'mini',
            statusListMap: CONFIG.statusListMap,
            tableData: CONFIG.tableData,
            cloumnList: CONFIG.cloumnList,
            leftAlian: CONFIG.leftAlian || [],
            centerAlian: CONFIG.centerAlian || [],
            rightAlian: CONFIG.rightAlian || [],
            formInline: {
                p_id: '',
                p_status: '',
            }
        };
    },
    created() {},
    mounted() {
        this.title = this.$route.meta.label
        // console.log('this.$route', this.$route.meta)
    },
    methods:{
        getScroll(event) {
            // 滚动条距离底部的距离scrollBottom
            // scrollHeight:只读属性是一个元素的内容的高度，包括由于溢出的内容在屏幕上不可见的测量
            // scrollTop:属性获取或设置元素内容垂直滚动的像素数
            // clientHeight:没有CSS或内联布局框的元素的只读属性为零；否则，它是元素的内部高度（以像素为单位）。它包括填充，但不包括边框，边距和水平滚动条（如果存在）

            let scrollBottom = event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight;
            if (scrollBottom <= 10) {
                //返回成功后再请求接口
                // console.log('快到底了！')
            } else {
                return;
            }
        },
        handleCopy(val) {
            this.$copyText(val).then(
                e => {
                    this.$message.success(val + '' + '复制成功!')
                }
            )
        },
        handleSearch() {
            console.log('submit!');
        },
        sumOrderAlianConfig() {
            let configs = ['leftAlian', 'centerAlian', 'rightAlian']
            let resOrderAlianConfig = {};
            // 数组通过map转化为对象
            configs.map( item => {
                resOrderAlianConfig[item] = this[item];
            });
            // console.log('resOrderAlianConfig', resOrderAlianConfig)
            return resOrderAlianConfig
        },
        handleGetData(){
            axios.get('https://api.coindesk.com/v1/bpi/currentprice.json', {})
            .then( res => {
                console.log(res);
                this.msg = res.data.chartName
            })
            .catch(function (error) {
                console.log(error);
            });
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .order-list{
        // border: 1px solid red;
        height: calc(100vh - 74px); //home里设置了padding，所以高度为：100vh - 54px - 10px - 10px
        overflow-y: auto;
        overflow-x: auto;
        .table_container{
            // border: 1px solid red;
        }
    }
</style>
