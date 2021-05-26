<template>
    <div class="lineChart">
        <div>柱状对比图</div>
        <div id="myHistogramComparison" :style="estyle"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BrushComponent,
} from 'echarts/components'
import {
    BarChart,
} from 'echarts/charts'
import {
    CanvasRenderer,
} from 'echarts/renderers'

echarts.use(
    [ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, BrushComponent, BarChart, CanvasRenderer],
)


const xAxisData = []
const data1 = []
const data2 = []

for (let i = 0; i < 10; i += 1) {
    xAxisData.push(`Class${i}`)
    data1.push((Math.random() * 2).toFixed(2))
    data2.push((Math.random() * 5).toFixed(2))
}

const emphasisStyle = {
    itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(0,0,0,0.3)',
    },
}

export default {
    name: 'histogramComparison',
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
            // 基于准备好的dom，初始化echarts实例
            const myHistogramComparison = echarts.init(document.getElementById('myHistogramComparison'))
            // 绘制图表
            myHistogramComparison.setOption({
                legend: {
                    data: ['bar', 'bar2'],
                    left: '10%',
                },
                // brush: {
                //     toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
                //     xAxisIndex: 0,
                // },
                // toolbox: {
                //     feature: {
                //         magicType: {
                //             type: ['stack', 'tiled'],
                //         },
                //         dataView: {},
                //     },
                // },
                tooltip: {},
                xAxis: {
                    data: xAxisData,
                    name: 'X Axis',
                    axisLine: { onZero: true },
                    splitLine: { show: false },
                    splitArea: { show: false },
                },
                yAxis: {},
                grid: {
                    bottom: 100,
                },
                series: [
                    {
                        name: 'bar',
                        type: 'bar',
                        stack: 'one',
                        emphasis: emphasisStyle,
                        data: data1,
                    },
                    {
                        name: 'bar2',
                        type: 'bar',
                        stack: 'one',
                        emphasis: emphasisStyle,
                        data: data2,
                    },
                ],
            })
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
