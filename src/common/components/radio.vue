<template>
    <div class="p_radio">
        <a-radio-group v-bind="$attrs" :value="dateTab" @change="change">
            <a-radio-button style="width:80px; text-align:center" v-for="it in radioGroup" :key="it.id" :value="it.id">
                {{it.value}}
            </a-radio-button>
        </a-radio-group>
    </div>
</template>

<script>
export default {
    name: 'p_radio',
    model: {
        prop: 'dateTab', //prop: 在该组件被使用(被父组件调用)时,v-model的值绑定给dateTab
        event: 'change' //event: emit(触发)change的时候，参数的值就是父组件v-model收到的值。
    },
    props:{
        dateTab: Number,
        radioGroup: Array
    },
    data(){
        return {}
    },
    methods:{
        change(val){
            const value = val.target.value
            this.$emit('change', value)
        }
    }
};
</script>

<style>
.p_radio{}
</style>
