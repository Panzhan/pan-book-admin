<template>
    <div class="lineChart">
        <div id="myPieChart" :style="estyle"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
} from 'echarts/components'
import {
    PieChart,
} from 'echarts/charts'
import {
    CanvasRenderer,
} from 'echarts/renderers'

echarts.use(
    [TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer],
)


export default {
    name: 'pieChart',
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
            const myPieChart = echarts.init(document.getElementById('myPieChart'))
            // 绘制图表
            myPieChart.setOption({
                title: {
                    text: '某站点用户访问来源',
                    subtext: '纯属虚构',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: '搜索引擎' },
                            { value: 735, name: '直接访问' },
                            { value: 580, name: '邮件营销' },
                            { value: 484, name: '联盟广告' },
                            { value: 300, name: '视频广告' },
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        },
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
