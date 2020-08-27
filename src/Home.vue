<template>
    <div class="home_max_container">
        <!-- 头部 -->
        <div class="home_top_container">
            <div class="home_top_title">
                <h1>SBS</h1>
            </div>
            <div @click="handleCopyUserName" class="home_top_user_name">
                <h4>{{ user_name }}</h4>
            </div>
            <div class="home_top_user_logo_container">
                <img class="home_top_user_logo" width="100%" :src="user_logo" alt="">
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
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                    <el-submenu v-else :index="item.path" :key="item.id">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="child in item.child_menus" :index="child.path" :key="child.id">
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
import axios from 'axios';
export default {
    name: 'HelloWorld',
    data() {
        return {
            user_name: 'Sauron',
            user_logo: 'https://img.bosszhipin.com/beijin/mcs/useravatar/20190503/2494a6ba5e588c099d3e2879839c44a89aa29a743879e40f3f4a1766e8ada82f_s.png',
            menuList: [
                {
                    path: '/',
                    id: '1',
                    icon: 'el-icon-goods',
                    title: '图书管理',
                    child_menus: [
                        {
                            path: '/book-list',
                            id: '3',
                            icon: '',
                            title: '图书首页',
                        }
                    ]
                },
                {
                    path: '/2',
                    id: '2',
                    icon: 'el-icon-setting',
                    title: '系统管理',
                    child_menus: [
                        {
                            path: '/order-list',
                            id: '4',
                            icon: '',
                            title: '订单管理',
                        },
                        {
                            path: '/book-management',
                            id: '5',
                            icon: '',
                            title: '图书管理',
                        },
                    ]
                }
            ],
            isCollapse: false
        };
    },
    created() {
        let path = this.$route.path
        console.log('this.$router', this.$route.path)
        if(path === '/') {
            this.$router.push('/book-list');
        }
    },
    mounted() {
    },
    methods:{
        handleCopyUserName() {
            this.$copyText(this.user_name).then(
                e => {
                    this.$message.success('用户姓名'+ this.user_name + '复制成功!')
                }
            )
        },
        handleOpen() {

        },
        handleClose() {

        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .home_max_container{
        .home_top_container{
            display: flex;
            width: 100%;
            height: 54px;
            line-height: 54px;
            background-color: rgba(40, 36, 33, 1);
            .home_top_title{
                padding-left: 10px;
                color: rgba(146, 121, 102, 1);
            }
            .home_top_user_name{
                color: rgba(146, 121, 102, 1);
                position: absolute;
                right: 65px;
                cursor:pointer;
            }
            .home_top_user_logo_container{
                margin-top: 4px;
                border-radius: 50%;
                width: 45px;
                height: 45px;
                border: 1px solid black;
                position: absolute;
                right: 10px;
                .home_top_user_logo{
                    border-radius: 50%;
                }
            }
        }
        .home_menu_container{
            border-right: 1px solid rgba(221, 221, 221, 1);
            height: calc(100vh - 54px);
            float: left;
            width: 200px;
            .el-menu-vertical {
                border-right: none;
                .el-menu-item.is-active {
                    color: currentColor;
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
            padding: 10px 10px;
            position: absolute;
            left: 200px;
        }
    }
</style>