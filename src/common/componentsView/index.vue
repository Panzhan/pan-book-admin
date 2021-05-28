<template>
    <div class="p_view">
        <h3>radio组件---{{tabValue}}</h3>
        <P-Radio 
            size="default" 
            v-model="tabValue" 
            :radioGroup="radioGroup" 
            @change="handleChange"
        ></P-Radio>
        <br>
        <h3>tab组件----{{ptab}}</h3>
        <P-Tab 
            :boxSize='boxSize' 
            :defaultTab='defaultTab' 
            :tablist="tablist" 
            @click="handleClick"
        ></P-Tab>
        <br>
        <!-- <Pcavcans></Pcavcans> -->
    </div>
</template>

<script>
import Radio from '../components/radio'
import Tab from '../components/tab'
import Pcavcans from './canvasDemo'
export default {
    name: 'p_view',
    components:{
        'P-Radio': Radio,
        'P-Tab': Tab,
        Pcavcans
    },
    data(){
        return {
            ptab: null, // div不支持v-model，故需在父组件手赋值
            defaultTab: 2, // P-Tab组件默认值，tab值可通过click回调拿到
            tabValue: 2, // P-Radio组件默认值
            boxSize: 'small', // P-Tab组件大小
            radioGroup: [ // 格式id: Number, value: String
                {
                    id: 1,
                    value: '日'
                },
                {
                    id: 2,
                    value: '周'
                },
                {
                    id: 3,
                    value: '月'
                }
            ],
            tablist:[
                {
                    id: 1,
                    name: 'Java'
                },
                {
                    id: 2,
                    name: 'JavaScript'
                },
                {
                    id: 3,
                    name: 'Python'
                }
            ]
        }
    },
    created(){
        this.ptab = this.defaultTab
    },
    methods:{
        handleChange(val){
            // console.log('fa', val)
        },
        handleClick(e){ // 两个参数，第一个为选中的ID，第二个为带选中状态的tab数组
            // console.log(e)
            this.ptab = e
        }
    }
};
</script>

<style>
.p_view{}
</style>
