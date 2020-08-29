export default {
    // 订单状态
    statusListMap: {
        '0': '待发货',
        '1': '已发货',
        '2': '订单完成',
        '3': '订单取消',
        '4': '订单异常'
    },
    // 订单列表数据
    tableData: [
        {
            p_id: '12345',
            p_status: '0',
            p_status_str: '待发货',
            phone: '13971737656',
            operation: {
                type: 'button',
                isDisable: false,
                title: '更改订单'
            },
            user_name: 'Faker'
            
        }, 
        {
            p_id: '12346',
            p_status: '1',
            p_status_str: '已发货',
            phone: '18571737656',
            operation: {
                type: 'button',
                isDisable: false,
                title: '更改订单'
            },
            user_name: 'Duke'
        }, 
        {
            p_id: '12347',
            p_status: '2',
            p_status_str: '订单完成',
            phone: '13671737656',
            operation: {
                type: 'button',
                isDisable: true,
                title: '更改订单'
            },
            user_name: 'Ming'
        }, 
        {
            p_id: '12347',
            p_status: '3',
            p_status_str: '订单取消',
            phone: '13671737656',
            operation: {
                type: 'button',
                isDisable: true,
                title: '更改订单'
            },
            user_name: ''
        },
        {
            p_id: '12347',
            p_status: '4',
            p_status_str: '订单异常',
            phone: '13671737656',
            operation: {
                type: 'button',
                isDisable: false,
                title: '更改订单'
            },
            user_name: 'Chen'
        },
    ],
    // 列表字段配置
    cloumnList: [
        {
            label: '订单号',
            value: 'p_id',
        }, 
        {
            label: '订单状态',
            value: 'p_status',
        },
        {
            label: '姓名',
            value: 'user_name',
        }, 
        {
            label: '联系方式',
            value: 'phone',
        }, 
        {
            label: '操作',
            value: 'operation',
        }, 
    ],
    // orderAlianConfig: {
    //     leftAlian: [
    //         'p_id',
    //         'p_status',
    //         'user_name'
    //     ],
    //     centerAlian: [
    //         'operation'
    //     ],
    //     rightAlian: [
    //         'phone',
    //     ],
    // },

    // 表格列居中居左居右配置
    leftAlian: [
        'p_id',
        'p_status',
        'user_name'
    ],
    centerAlian: [
        'operation'
    ],
    rightAlian: [
        'phone',
    ]
};