<template>
    <div class="histogram">
        <div>柱状图</div>
        <div id="myHistogramChart" :style="estyle"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
} from 'echarts/components'
import {
    BarChart,
} from 'echarts/charts'
import {
    CanvasRenderer,
} from 'echarts/renderers'

echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, LegendComponent, BarChart, CanvasRenderer],
)

export default {
    name: 'histogram',
    props: {
        estyle: Object,
    },
    components: { },
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
            // 基于准备好的dom，初始化echarts实例
            const myHistogramChart = echarts.init(document.getElementById('myHistogramChart'))
            // 绘制图表
            myHistogramChart.setOption({
                // title: { text: '在Vue中使用echarts柱状图' },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [
                        {
                            value: 5,
                            itemStyle: {
                                color: 'red',
                            },
                        }, 20, 36, 10, 10, 20],
                }],
            })
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
