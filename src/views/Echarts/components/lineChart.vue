<template>
    <div class="lineChart">
        <div>折线图</div>
        <div id="myLineChartChart" :style="estyle"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
    GridComponent,
} from 'echarts/components'
import {
    LineChart,
} from 'echarts/charts'
import {
    CanvasRenderer,
} from 'echarts/renderers'

echarts.use(
    [GridComponent, LineChart, CanvasRenderer],
)


export default {
    name: 'lineChart',
    components: { },
    props: {
        estyle: Object,
    },
    data() {
        return {
        }
    },
    created() { },
    mounted() {
        this.drawLine()
    },
    methods: {
        drawLine() {
            console.log('echarts', echarts)
            // 基于准备好的dom，初始化echarts实例
            const myLineChartChart = echarts.init(document.getElementById('myLineChartChart'))
            // 绘制图表
            myLineChartChart.setOption({
                // title: { text: '在Vue中使用echarts折线图' },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                },
                yAxis: {
                    type: 'value',
                },
                series: [{
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line',
                }],
            })
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
