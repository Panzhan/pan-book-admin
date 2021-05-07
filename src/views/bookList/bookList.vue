<template>
    <div @scroll.passive="getScroll($event)" class="book-list">
        <h2 style="margin-bottom: 10px;display: inline;">{{ title }}</h2>
        <div @click="handleClick" class="user_shopping">
            <i class="el-icon-shopping-cart-full"></i>
        </div>
        <el-form :inline="true" :model="form" class="form_container demo-form-inline">
            <el-form-item label="测试">
                <el-input
                    :size='commonSize'
                    v-model="form.test"
                    placeholder="测试输入框"
                    @input="handleInputChange(form.price)"
                >
                </el-input>
            </el-form-item>
            <el-form-item label="价格">
                <el-input
                    :size="commonSize"
                    v-model="form.price"
                    placeholder="输入价格"
                    @input="handleInputChange(form.price)"
                >
                </el-input>
            </el-form-item>
            <el-form-item label="书名">
                <el-select
                    :size="commonSize"
                    v-model="book_name"
                    placeholder="选择书名"
                    @change="handleSelectChange($event, 'book_name')"
                >
                    <el-option
                        v-for="item in bookNameList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类型">
                <el-select
                    :size="commonSize"
                    v-model="book_type"
                    placeholder="选择书籍类型"
                    @change="handleSelectChange($event, 'book_type')"
                >
                    <el-option
                        v-for="item in bookTypeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="作者">
                <el-select
                    :size="commonSize"
                    v-model="author"
                    placeholder="选择作者"
                    @change="handleSelectChange($event, 'author')"
                >
                    <el-option
                        v-for="item in bookAuthorList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button :size="commonSize" type="primary" @click="handleSearch">查询</el-button>
            </el-form-item>
        </el-form>
        <el-dialog
            title=""
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
        >
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <div class="max_box">
            <el-card v-for="item in bookList" :key="item.idx" class="stick_box box-card" shadow="always">
                <img
                    class="img_style"
                    :src="item.url"
                />
                <span style="text-align: left;">{{item.book_name}}</span>
                <div style="display: inline; float: right; font-size: 20px">
                    <i class="el-icon-star-off"></i>
                    <i class="el-icon-shopping-cart-2"></i>
                </div>
                <hr style="width: 100%" />
                <div class="info_box_style">
                    <!-- v-for遍历map:第一个参数为值，第二个参数为键 -->
                    <div v-for="(val, key) in bookInfoList" :key="key" >
                        <p class="info_text">
                            {{ val }}
                        </p>
                        <p class="info_num">
                            {{
                                key === 'book_price' ? '¥' + `${item[key]}` : item[key]
                            }}
                        </p>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
// eslint-disable-next-line import/extensions
import CONFIG from '@/config/bookListConfig.js'
// eslint-disable-next-line import/no-extraneous-dependencies
import debounce from 'lodash/debounce'

export default {
    name: 'BookList',
    data() {
        return {
            dialogVisible: false,
            title: '',
            commonSize: 'mini',
            bookInfoList: {
                book_author: '作者',
                book_price: '价格',
                book_sell: '销量',
                book_type_str: '类型',
            },
            bookNameList: [
                { id: 0, name: '十万个为什么（一）' },
                { id: 1, name: '十万个为什么（二）' },
            ],
            bookTypeList: [
                { id: 0, name: '考古' },
                { id: 1, name: '科技' },
            ],
            bookAuthorList: [
                { id: 0, name: 'Sauron' },
                { id: 1, name: 'Nicholas' },
            ],
            bookList: CONFIG.bookList,
            price: '',
            book_name: '',
            book_type: '',
            author: '',
            form: {
                price: '',
                book_name: '',
                book_type: '',
                author: '',
                test: [1, 2, 3],
                // test:'123'
            },
        }
    },
    created() {
        this.handleTest()
    },
    mounted() {
        this.title = this.$route.meta.label
        window.console.log('this.$route', this.$route.meta)
    },
    methods: {
        getScroll(event) {
            // 滚动条距离底部的距离scrollBottom
            // scrollHeight:只读属性是一个元素的内容的高度，包括由于溢出的内容在屏幕上不可见的测量
            // scrollTop:属性获取或设置元素内容垂直滚动的像素数
            // clientHeight:没有CSS或内联布局框的元素的只读属性为零；否则，它是元素的内部高度（以像素为单位）。它包括填充，但不包括边框，边距和水平滚动条（如果存在）

            // eslint-disable-next-line max-len
            const scrollBottom = event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight
            if (scrollBottom <= 10) {
                // 返回成功后再请求接口
                // console.log('快到底了！')
            // eslint-disable-next-line no-empty
            } else {

            }
        },
        handleSelectChange(val, type) {
            this.form[type] = this[type]
            this.handleSearch()
        },
        // eslint-disable-next-line func-names
        handleInputChange: debounce(function (value) {
            window.console.log(value)
            this.handleSearch()
        }, 1000),
        handleClick() {
            this.dialogVisible = true
        },
        handleClose() {

        },
        handleCopy() {
            // this.$copyText(this.msg).then(
            //     e => {
            //         this.$message.success(this.msg + '' + '复制成功!')
            //     }
            // )
        },
        handleSearch() {
            // this.form.test[1]=41
            this.$set(this.form.test, 1, 444) // $set 可以触发更新视图
            // this.form.test = '134'
            window.console.log('submit!')
        },
        handleGetData() {
            axios.get('https://api.coindesk.com/v1/bpi/currentprice.json', {})
                .then((res) => {
                    window.console.log(res)
                    this.msg = res.data.chartName
                })
                .catch((error) => {
                    window.console.log(error)
                })
        },
        handleTest() {

        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .book-list{
        // border: 1px solid red;
        height: calc(100vh - 74px); //home里设置了padding，所以高度为：100vh - 54px - 10px - 10px
        overflow-y: auto;
        .user_shopping{
            display: inline;
            float: right;
            font-size: 30px;
            cursor:pointer;
            .el-icon-shopping-cart-full{
                color: rgba(71, 71, 71, 1)
            }
        }
        .user_shopping:hover{
            .el-icon-shopping-cart-full{
                color: rgba(126,190,80,1)
            }
        }
        .form_container{
            margin-top: 10px;
        }
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
