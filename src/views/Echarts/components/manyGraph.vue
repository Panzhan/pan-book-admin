<template>
    <div class="lineChart">
        <div id="myManyGraph" :style="estyle"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
} from 'echarts/components'
import {
    LineChart,
} from 'echarts/charts'
import {
    CanvasRenderer,
} from 'echarts/renderers'

echarts.use(
    [DatasetComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, CanvasRenderer],
)

const ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples'
const seriesList = []
export default {
    name: 'manyGraph',
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
        this.$nextTick(() => {
            this.initData()
        })
    },
    methods: {
        initData(){
            setTimeout(() => {
                const myManyGraph = echarts.init(document.getElementById('myManyGraph'))
                const option = {
                    legend: {},
                    tooltip: {
                        trigger: 'axis',
                        showContent: false,
                    },
                    dataset: {
                        source: [
                            ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
                            ['Milk Tea', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
                            ['Matcha Latte', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
                            ['Cheese Cocoa', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
                            ['Walnut Brownie', 25.2, 37.1, 41.2, 18, 33.9, 49.1],
                        ],
                    },
                    xAxis: { type: 'category' },
                    yAxis: { gridIndex: 0 },
                    series: [
                        { type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
                        { type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
                        { type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
                        { type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: { focus: 'series' } },
                    ],
                }

                myManyGraph.setOption(option)
            })
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
