<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button @click="handleCopy(msg)">默认按钮</el-button>
    <el-button @click="handleGetData()">异步请求</el-button>
    <el-button @click="handleClear()">清空请求</el-button>
    <div class="text_box">32412412</div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'HelloWorld',
    data() {
        return {
            timer: 10000,
            requestsCount: 1,
            msg: 'Welcome to Your Vue.js App',
        };
    },
    created() {
        
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
                    this.$message.success(this.msg)
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
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .hello{
        .text_box{
            color: red;
            margin-top: 20px;
        }
    }
</style>
