<template>
    <div class="home_max_container">
        <!-- 头部 -->
        <div class="home_top_container">
            <div @click="handleTestVuexText" class="home_top_title">
                <h1>SBS</h1>
            </div>
            <div @click="handleCopyUserName(userInfo.user_name)" class="home_top_user_name">
                <h4>{{ userInfo.user_name }}</h4>
            </div>
            <div @click="handleTestVuexImg" class="home_top_user_logo_container">
                <img class="home_top_user_logo" width="100%" :src="userInfo.user_logo" alt="">
            </div>
        </div>

        <!-- 左侧菜单栏 -->
        <div class="home_menu_container">
            <el-menu
                :default-active="$route.path"
                :collapse-transition="false"
                class="el-menu-vertical"
                @open="handleOpen"
                @close="handleClose"
                unique-opened
                router
                :collapse="isCollapse"
            >
                <template v-for="item in menuList">
                    <el-menu-item v-if="item.child_menus.length === 0" :index="item.path" :key="item.id">
                        <i style="margin-top: -4px;" :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                    <el-submenu v-else :index="item.path" :key="item.id">
                        <template slot="title">
                            <i style="margin-top: -4px;" :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item style="padding-left: 54px;" v-for="child in item.child_menus" :index="child.path" :key="child.id">
                            {{ child.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
            </el-menu>
        </div>

        <!-- 主体内容 -->
        <div class="main_content">
            <transition name="fade" mode="out-in">
                <router-view
                    ref="view"
                    :key="$route.path"
                >
                </router-view>
            </transition>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
import CONFIG from '@/config/homeRouterConfig.js'

let VUEX_KEY = 'home'; // vuex 模块标示
export default {
    name: 'HelloWorld',
    data() {
        return {
            userInfo: CONFIG.userInfo,
            menuList: CONFIG.menuList,
            isCollapse: false,
            SauronMeun: ['1','2','3','5','6']
        };
    },
    computed: {
        ...mapState(['pageSize']), //index路径下的state
        ...mapState(VUEX_KEY, ['testStr', 'testDate']) //对应模块下的state
    },
    created() {
        let path = this.$route.path
        // console.log('this.$router', this.$route.path)
        if(path === '/') {
            this.$router.push('/book-list');
        }
        // this.getUserInfo('userInfo', this.userInfo)
    },
    mounted() {
        // console.log('defaultString', this.testStr)
        // console.log('pageSize', this.pageSize)
        localStorage.setItem(`${this.userInfo.user_name}-info`, JSON.stringify(this.SauronMeun));
    },
    methods:{
        ...mapActions(VUEX_KEY, ['updateString', 'updateDate']
        ),
        handleTestVuexText() { 
            let paramsStr = 'string2'
            this.updateString(paramsStr).then(
                e => {
                    console.log('afterString by handleTestVuexText', this.testStr)
                }
            )
        },
        handleTestVuexImg() {
            this.updateDate().then(
                e => {
                    console.log('afterDate by handleTestVuexImg', this.testDate)
                }
            )
        },
        handleCopyUserName(val) {
            this.$copyText(val).then(
                e => {
                    this.$message.success('用户姓名'+ val + '复制成功!')
                    this.updateString().then(
                        e => {
                            console.log('afterString by handleCopyUserName', this.testStr)
                        }
                    )
                }
            )
        },
        handleOpen() {},
        handleClose() {},
        getUserInfo(){
            // axios.get('https://run.mocky.io/v3/4552b124-dead-4f6a-b965-adc5947bc0a6', {})
            // .then(res => {
            //     console.log('res', res)
            //     this.user_logo = res.data.user_logo;
            //     this.user_name = res.data.user_name
            // })
            // .catch(function (error) {
            //     console.log(error);
            // });
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .home_max_container{
        width: 100%;
        overflow-x: hidden;
        .home_top_container{
            display: flex;
            width: 100%;
            height: 54px;
            line-height: 54px;
            background-color: rgba(40, 36, 33, 1);
            cursor:pointer;
            .home_top_title{
                padding-left: 22px;
                color: rgba(146, 121, 102, 1);
            }
            .home_top_user_name{
                color: rgba(146, 121, 102, 1);
                position: absolute;
                right: 65px;
            }
            .home_top_user_logo_container{
                margin-top: 6px;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                border: 1px solid black;
                position: absolute;
                right: 10px;
                .home_top_user_logo{
                    border-radius: 50%;
                }
            }
            .home_top_user_name:hover,
            .home_top_user_logo_container:hover,
            .home_top_title:hover{
                transform:scale(1.1);
            }
        }
        .home_menu_container{
            border-right: 1px solid rgba(236, 238, 244, 1);
            height: calc(100vh - 54px);
            float: left;
            width: 200px;
            .el-menu-vertical {
                border-right: none;
                .el-menu-item.is-active {
                    // color: currentColor;
                    background-color: #f2f8ff;
                    position: relative;
                    &::after {
                        content: '';
                        display: block;
                        width: 5px;
                        height: 100%;
                        background-color: #4e97ff;
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                }
                span[slot='title'] {
                    color: #a0a8ac;
                }
            }
            .el-submenu .el-menu-item {
                min-width: 200px;
            }
        }
        .main_content{
            // border: 1px solid red;
            width: calc(100% - 220px);
            padding: 10px 10px;
            padding-right: 5px;
            position: absolute;
            left: 200px;
        }
    }
</style>