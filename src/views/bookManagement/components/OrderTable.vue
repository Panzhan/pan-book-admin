<template>
    <div class="table_container">
        <el-table
            border
            ref="tableData"
            :data="tableData"
            style="width: 100%;font-size:12px;width: 100%"
        >
            <el-table-column
                v-for="(item, index) in cloumnList"
                :key="index"
                :prop="item.value"
                :label="item.label"
                :min-width="handleWidth(item.value)"
                :align="handleAlian(item.value)"
            >
                <template slot-scope="scope">
                    <p v-if="!scope.row[item.value]">{{ "-" }}</p>
                    <p 
                        class="status_text"
                        :class="`status_${scope.row[item.value]}_color`" 
                        v-else-if="item.value === 'p_status'"
                    >
                        {{ handleText(scope.row[item.value]) }}
                    </p>
                    <p 
                        v-else-if="item.value === 'phone'" 
                        @click="handleCopy(scope.row[item.value])"
                    >
                        <el-button type="text">
                            {{ scope.row[item.value] }}
                        </el-button>
                    </p>
                    <p 
                        v-else-if="item.value === 'operation'"
                    >
                        <el-button 
                            :disabled="Boolean(scope.row[item.value].isDisable)" 
                            type="text"
                        >
                            {{scope.row[item.value].title}}
                        </el-button>
                    </p>
                    <p v-else>{{ scope.row[item.value] }}</p>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import CONFIG from '@/config/orderListConfig.js'
export default {
    props: {
        tableData: {
            type: Array,
            default: function() {
                return [];
            }
        },
        leftAlian: {
            type: Array,
            default: function() {
                return [];
            }
        },
        rightAlian: {
            type: Array,
            default: function() {
                return [];
            }
        },
        centerAlian: {
            type: Array,
            default: function() {
                return [];
            }
        },
        orderAlianConfig: {
            type: Object,
            default: function() {
                return {};
            }
        },
        cloumnList: {
            type: Array,
            default: function() {
                return [];
            }
        },
    },
    data() {
        return {};
    },
    mounted() {

    },
    methods: {
        handleText(valStatus) {
            return CONFIG.statusListMap[valStatus]
        },
        handleAlian(valAlian) {
            // console.log('orderAlianConfig', this.orderAlianConfig)
            let result
            for(let key  in this.orderAlianConfig){
                if(this.orderAlianConfig[key].includes(valAlian)){
                    result = key.split('Alian')[0];
                }
            }
            return result
        },
        handleWidth(valWidth) {
            switch(valWidth.length){
                case 1:
                    return 20;
                case 2:
                    return 30;
                case 3:
                    return 40;
                case 4:
                    return 50;
            }
        },
        handleCopy(val) {
            this.$emit('handleCopy', val)
        }
    }
};
</script>
<style lang="less">
    .table_container{
        .status_text{
            margin-left: 18px;
        }
        .status_4_color:before,
        .status_3_color:before,
        .status_2_color:before,
        .status_1_color:before,
        .status_0_color:before{
            content: "";
            width: 8px;
            height: 8px;
            display: block;
            z-index: 1;
            position: absolute;
            left: 12px;
            top: 27px;
            border-radius: 50%;
        }
        .status_0_color:before{
            background: red;
        }
        .status_1_color:before{
            background: rgba(99, 149, 63, 1);
        }
        .status_2_color:before{
            background: rgba(106, 106, 255, 1);
        }
        .status_3_color:before{
            background: rgba(160, 158, 48, 1);
        }
        .status_4_color:before{
            background: rgba(214, 214, 214, 1);
        }
    }
</style>
