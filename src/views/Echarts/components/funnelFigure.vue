<template>
    <div class="histogram">
        <div>漏斗图</div>
        <div id="myFunnelFigureChart" :style="estyle"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    LegendComponent,
} from 'echarts/components'
import {
    FunnelChart,
} from 'echarts/charts'
import {
    CanvasRenderer,
} from 'echarts/renderers'

echarts.use(
    [TitleComponent, ToolboxComponent, TooltipComponent, LegendComponent, FunnelChart, CanvasRenderer],
)

export default {
    name: 'funnelFigure',
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
        console.log('estyle', this.estyle)
        this.drawLine()
    },
    methods: {
        drawLine() {
            console.log('echarts', echarts)
            // 基于准备好的dom，初始化echarts实例
            const myFunnelFigureChart = echarts.init(document.getElementById('myFunnelFigureChart'))
            // 绘制图表
            myFunnelFigureChart.setOption({
                // title: {
                //     text: '漏斗图',
                //     subtext: '纯属虚构',
                // },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c}%',
                },
                toolbox: {
                    feature: {
                        dataView: { readOnly: false },
                        restore: {},
                        saveAsImage: {},
                    },
                },
                legend: {
                    data: ['新增供应商数', '入库供应商数', '出价供应商数', '产生订单供应商数'],
                },

                series: [
                    {
                        name: '漏斗图',
                        type: 'funnel',
                        left: '10%',
                        top: 60,
                        // x2: 80,
                        bottom: 60,
                        width: '80%',
                        // height: {totalHeight} - y - y2,
                        min: 0,
                        max: 1000,
                        minSize: '0%',
                        maxSize: '100%',
                        sort: 'descending',
                        gap: 2,
                        label: {
                            show: true,
                            position: 'inside',
                        },
                        labelLine: {
                            length: 10,
                            lineStyle: {
                                width: 1,
                                type: 'solid',
                            },
                        },
                        itemStyle: {
                            borderColor: '#fff',
                            borderWidth: 1,
                        },
                        emphasis: {
                            label: {
                                fontSize: 20,
                            },
                        },
                        data: [
                            { value: 560, name: '产生订单供应商数' },
                            { value: 620, name: '出价供应商数' },
                            { value: 700, name: '入库供应商数' },
                            { value: 1000, name: '新增供应商数' },
                        ],
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
