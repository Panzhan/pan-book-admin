export default {
    // 书籍列表
    menuList: [
        {
            path: '/book-list',
            id: '1',
            icon: 'el-icon-goods',
            title: '图书商城',
            child_menus: []
        },
        {
            path: '/book-management',
            id: '2',
            icon: 'el-icon-reading',
            title: '图书管理',
            child_menus: [
                {
                    path: '/order-center',
                    id: '3',
                    icon: '',
                    title: '订单管理',
                },
                {
                    path: '/book-center',
                    id: '4',
                    icon: '',
                    title: '图书管理',
                },
            ]
        },
        {
            path: '/system-management',
            id: '5',
            icon: 'el-icon-setting',
            title: '系统管理',
            child_menus: [
                {
                    path: '/user-center',
                    id: '6',
                    icon: '',
                    title: '用户管理',
                }
            ]
        }
    ],
    //当前用户菜单
    userInfo: { 
        user_type: 'super',
        user_id: '0',
        is_inner: true,
        user_name: 'Sauron',
        SauronMeun: ['1','2','3','5','6'],
        user_logo: 'https://img.bosszhipin.com/beijin/mcs/useravatar/20190503/2494a6ba5e588c099d3e2879839c44a89aa29a743879e40f3f4a1766e8ada82f_s.png',
    }
};