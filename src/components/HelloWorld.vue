<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <el-button @click="handleCopy(msg)">默认按钮</el-button>
    <div class="text_box">32412412</div>
  </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
        };
    },
    methods:{
        handleCopy() {
            this.$copyText(this.msg).then(
                e => {
                    this.$message.success(this.msg)
                }
            )
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
    .hello{
        .text_box{
            color: red;
        }
    }
</style>
