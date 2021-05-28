<template>
    <div class="p_tab">
        <div 
            class="item_tab" 
            @click="click" 
            :class="[tabClassById(it), tabClassByProp(boxSize)]" 
            v-for="it in resTabs" 
            :key="it.id" 
            :id="Number(it.id)"
        >
            {{it.name}}
        </div>
    </div>
</template>

<script>
import _ from "lodash"; // 导入loadsh插件
import lodash from 'lodash' // 导入loadsh插件
export default {
    name: 'p_tab',
    props:{
        tablist: Array, // tab列表
        defaultTab: Number, // 默认选中的tab
        boxSize: String, // P-Tab组件大小
    },
    components:{},
    data(){
        return {
            resTabs: []
        }
    },
    computed:{},
    created(){
        let _tablist = _.cloneDeep(this.tablist)
        _tablist.map((element, index) => {
            element.picked = false
            if(element.id === this.defaultTab){
                element.picked = true
            }
        })
        this.resTabs = _tablist
    },
    methods:{
        tabClassById(it){
            if(it.picked) return 'picked'
            return 'notPicked'
        },
        tabClassByProp(val){
            switch (val){
                case 'small':
                    return 'small_tab'
                    break
                case 'default':
                    return 'default_tab'
                    break
                case 'large':
                    return 'large_tab'
                    break
                default:
                    'default_tab'
                    break
            }
        },
        click: lodash.debounce(
            function(e){
                const id = e.target.id
                this.resTabs.forEach((element,index) => {
                    this.resTabs[index].picked = false
                    if(element.id==id){
                        this.resTabs[index].picked = true
                    }
                })
                this.$emit('click', id, this.resTabs)
            }, 150
        )
    }
};
</script>

<style lang="less" scoped>
.p_tab{
    border-bottom: 1px solid #EFEFEF;
    display: flex;
    .default_tab,
    .item_tab{
        width: 140px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        &:hover{
            border: 1px solid rgb(0, 83, 255);
            color: rgb(0, 83, 255);
        }
        &:active{
            background: rgb(116, 165, 255);
        }
    }
    .small_tab{
        width: 120px;
        height: 40px;
        line-height: 40px;
    }
    .large_tab{
        width: 160px;
        height: 80px;
        line-height: 80px;
    }
    .picked{
        border-bottom: 3px solid rgb(0, 83, 255);
        color: rgb(0, 83, 255);
    }
}
</style>
