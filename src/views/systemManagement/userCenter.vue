<template>
    <div class="user-center">
        <h2 style="margin-bottom: 10px;">{{ title }}</h2>
    </div>
</template>

<script>
import axios from 'axios';
import CONFIG from '@/config/bookListConfig.js'
export default {
    name: 'User-Center',
    data() {
        return {
            title: '',
            formInline: {
                price: '',
                book_name: '',
                book_type: '',
                author: '',
            }
        };
    },
    created() {
    },
    mounted() {
        this.title = this.$route.meta.label
        console.log('this.$route', this.$route.meta)
    },
    methods:{
        handleCopy() {
            // this.$copyText(this.msg).then(
            //     e => {
            //         this.$message.success(this.msg + '' + '复制成功!')
            //     }
            // )
        },
        handleSearch() {
            console.log('submit!');
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
    .user-center{
        // border: 1px solid red;
        height: calc(100vh - 74px); //home里设置了padding，所以高度为：100vh - 54px - 10px - 10px
        overflow-y: auto;
        .max_box{
            display: flex;
            flex-wrap: wrap;
            .el-card__body {
                padding: 10px !important;
            }
            .stick_box{
                // border: 1px solid red;
                position: relative;
                .el-card__body {
                    padding: 10px !important;
                }
                .img_style{
                    width: 100%;
                }
            }
            .info_box_style {
                // border: 1px solid red;
                height: 48px;
                display: flex;
                justify-content: space-around;
                text-align: center;
                .info_num {
                    font-size: 12px;
                    font-weight: 600;
                    color: rgba(48, 49, 51, 1);
                    margin: 10px 0 7px 0;
                }
                .info_text {
                    font-size: 12px;
                    font-weight: 400;
                    color: rgba(144, 147, 153, 1);
                }
            }
        }
    }
</style>
