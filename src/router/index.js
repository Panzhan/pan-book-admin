import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/Home';
import BookList from '@/views/bookList/bookList';
import OrderList from '@/views/bookManagement/orderCenter';
import BookManagement from '@/views/bookManagement/bookCenter';
import UserCenter from '@/views/systemManagement/userCenter';
import NotFound from '@/404';
import Lottery from '../views/H5/Lottery/index.vue'

Vue.use(Router);

export default new Router({
    // 若有相同的path,会指向第一个
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            children: [
                {
                    path: '/book-list',
                    name: 'BookList',
                    component: BookList,
                    meta: {
                        label: '图书商城',
                    }
                },
                {
                    path: '/order-center',
                    name: 'OrderList',
                    component: OrderList,
                    meta: {
                        label: '订单管理',
                    }
                },
                {
                    path: '/book-center',
                    name: 'BookManagement',
                    component: BookManagement,
                    meta: {
                        label: '图书管理',
                    }
                },
                {
                    path: '/user-center',
                    name: 'UserCenter',
                    component: UserCenter,
                    meta: {
                        label: '用户管理',
                    }
                },
                {
                    path: '/not-found',
                    name: 'NotFound',
                    component: NotFound,
                    meta: {
                        label: '404',
                    }
                },
                // h5
                {
                    path: '/lottery',
                    name: 'Lottery',
                    component: Lottery,
                    meta: {
                        label: '抽奖',
                    }
                },
            ]

        },
        {
            path: '/404',
            name: '404',
            component: NotFound,
            meta: {
                label: '404',
            }
        },
    ],
});
