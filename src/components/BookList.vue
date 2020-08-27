<template>
    <div @scroll.passive="getScroll($event)" class="book-list">
        <h1>{{ msg }}</h1>
        <div class="max_box">
            <el-card v-for="item in bookList" :key="item.idx" class="stick_box" shadow="always">
                <img
                    class="img_style"
                    :src="item.url"
                />
                <div style="padding: 0 12px;">
                    <hr />
                </div>
                <div class="info_box_style">
                    <!-- 第一个参数为值，第二个参数为键 -->
                    <div v-for="(val, key) in bookInfoList" :key="key" >
                        <p class="info_text">
                            {{ val }}
                        </p>
                        <p class="info_num">{{ item[key] }}</p>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'BookList',
    data() {
        let imgUrl = 'https://img.bosszhipin.com/beijin/mcs/useravatar/20190503/2494a6ba5e588c099d3e2879839c44a89aa29a743879e40f3f4a1766e8ada82f_s.png'
        return {
            msg: 'Welcome to Page BookList',
            bookInfoList: {
                'book_name': '书名',
                'book_price': '价格',
                'book_author': '作者'
            },
            bookList: [
                {
                    idx: '0',
                    id: '1',
                    url: imgUrl,
                    book_name: '十万个为什么（一）',
                    book_price: '100',
                    book_author: 'Sauron',
                },
                {
                    idx: '1',
                    id: '2',
                    url: imgUrl,
                    book_name: '十万个为什么（二）',
                    book_price: '100',
                    book_author: 'Sauron',
                },
                {
                    idx: '2',
                    id: '3',
                    url: imgUrl,
                    book_name: '十万个为什么（三）',
                    book_price: '100',
                    book_author: 'Sauron',
                },
                {
                    idx: '3',
                    id: '4',
                    url: imgUrl,
                    book_name: '十万个为什么（四）',
                    book_price: '100',
                    book_author: 'Sauron',
                },
                {
                    idx: '4',
                    id: '5',
                    url: imgUrl,
                    book_name: '十万个为什么（五）',
                    book_price: '100',
                    book_author: 'Sauron',
                },
                {
                    idx: '5',
                    id: '6',
                    url: imgUrl,
                    book_name: '十万个为什么（六）',
                    book_price: '100',
                    book_author: 'Sauron',
                },
                {
                    idx: '6',
                    id: '7',
                    url: imgUrl,
                    book_name: '十万个为什么（七）',
                    book_price: '100',
                    book_author: 'Sauron',
                },
            ]
        };
    },
    created() {
        this.handleTest()
    },
    mounted() {
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
        handleCopy() {
            // this.$copyText(this.msg).then(
            //     e => {
            //         this.$message.success(this.msg + '' + '复制成功!')
            //     }
            // )
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
        handleTest() {

        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .book-list{
        // border: 1px solid red;
        height: calc(100vh - 74px); //home里设置了padding，所以高度为：100vh - 54px - 10px - 10px
        overflow-y: auto;
        .max_box{
            display: flex;
            flex-wrap: wrap;
            .stick_box{
                position: relative;
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
    // 大屏幕（1850px+）,排5个
    @media all and (min-width: 1850px) {
        .max_box {
            .stick_box {
                width: calc(95% / 5);
                margin-right: 1%;
                margin-bottom: 1%;
            }
            .stick_box:nth-child(5n) {
                margin-right: unset;
            }
            .stick_box:nth-child(5n-4) {
                margin-left: 0;
            }
        }
    }
    // 中屏幕（1265px～1849px+）,排4个
    @media all and (min-width: 1265px) and (max-width: 1849px) {
        .max_box {
            // border: 2px solid red;
            .stick_box {
                width: calc(96% / 4);
                margin-right: 1%;
                margin-bottom: 1%;
            }
            .stick_box:nth-child(4n) {
                margin-right: unset;
            }
            .stick_box:nth-child(4n-3) {
                margin-left: 0;
            }
        }
    }
    // 小屏幕（1050px～1464px）,排3个
    @media all and (min-width: 1050px) and (max-width: 1264px) {
        .max_box {
            .stick_box {
                width: calc(97% / 3);
                margin-right: 1%;
                margin-bottom: 1%;
            }
            // 最后一个元素不设置margin-right
            .stick_box:nth-child(3n) {
                margin-right: unset;
            }
            // 第一个元素设置margin-left为0
            .stick_box:nth-child(3n-2) {
                margin-left: 0;
            }
        }
    }
    // （780px～1049px）,排2个
    @media all and (min-width: 780px) and (max-width: 1049px) {
        .max_box {
            .stick_box {
                width: calc(98% / 2);
                margin-right: 1%;
                margin-bottom: 1%;
            }
            .stick_box:nth-child(2n) {
                margin-right: unset;
            }
            .stick_box:nth-child(2n - 1) {
                margin-left: 0;
            }
        }
    }
    //(780以下)，排一个
    @media all and (max-width: 779px) {
        .max_box {
            .stick_box {
                width: 100%;
            }
        }
    }
</style>
