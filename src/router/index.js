import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/Home';
import BookList from '@/components/BookList';
import OrderList from '@/components/OrderList';
import BookManagement from '@/components/BookManagement';

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
                },
                {
                    path: '/order-list',
                    name: 'OrderList',
                    component: OrderList,
                },
                {
                    path: '/book-management',
                    name: 'BookManagement',
                    component: BookManagement,
                },
            ]

        },
    ],
});
