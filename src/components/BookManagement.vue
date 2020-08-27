<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <el-button @click="handleCopy(msg)">复制文本</el-button>
        <el-button @click="handleGetData()">异步请求</el-button>
        <el-button @click="handleClear()">清空请求</el-button>
        <div class="less_text">这是CSS预处理语言：Less，它扩展了CSS语言增加了变量，Mixin，函数等特性，使CSS更易维护和扩展。可以运行在Node或浏览器端</div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'BookManagement',
    data() {
        return {
            timer: 10000,
            requestsCount: 1,
            msg: 'Welcome to Page BookManagement',
        };
    },
    created() {
        this.handleTest()
    },
    mounted() {
        // 定时执行
        // window.setInterval(() => {
        //     setTimeout(this.getNewMessage(), 0);
        // }, this.timer);
    },
    methods:{
        getNewMessage: function() {
            console.log("请求" + this.requestsCount++ + "次");
        },
        handleCopy() {
            this.$copyText(this.msg).then(
                e => {
                    this.$message.success(this.msg + '' + '复制成功!')
                }
            )
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
        handleClear(){
            location.reload();
        },
        handleTest() {

        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .hello{
        .less_text{
            color: red;
            margin-top: 20px;
        }
    }
</style>
