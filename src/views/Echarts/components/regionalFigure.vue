<template>
    <div class="histogram">
        <div>堆叠区域图</div>
        <div id="myRegionalFigure" :style="estyle"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
    TitleComponent,
    ToolboxComponent,
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
    [TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, CanvasRenderer],
)

export default {
    name: 'regionalFigure',
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
            const myRegionalFigure = echarts.init(document.getElementById('myRegionalFigure'))
            // 绘制图表
            myRegionalFigure.setOption({
                // title: {
                //     text: '堆叠区域图',
                // },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985',
                        },
                    },
                },
                legend: {
                    data: [
                        {icon: 'image://http://csstools.chinaz.com/tools/images/public/logos/logo-index.png', name: '搜索引擎'},
                        {icon: 'image://https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png', name: '直接访问'},
                        {icon: 'image://https://du.hupucdn.com/FkxJuhPYYgKpD47ezne9Bu5I2chU?imageView2/0/format/webp', name: '邮件营销'},
                        {icon: 'image://https://cdn.poizon.com/node-common/0dd36666168d2e83cf22635aba39a534.png?x-oss-process=image/format,webp', name: '联盟广告'},
                        {icon: 'diamond', name: '视频广告'}
                    ],
                    itemGap: 100,
                    itemWidth: 30,
                    itemHeight: 30,
                    formatter: (params) => {
                        return '';
                    },
                },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {},
                //     },
                // },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                    },
                ],
                series: [
                    {
                        name: '邮件营销',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series',
                        },
                        data: [120, 132, 101, 134, 90, 230, 210],
                    },
                    {
                        name: '联盟广告',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series',
                        },
                        data: [220, 182, 191, 234, 290, 330, 310],
                    },
                    {
                        name: '视频广告',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series',
                        },
                        data: [150, 232, 201, 154, 190, 330, 410],
                    },
                    {
                        name: '直接访问',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series',
                        },
                        data: [320, 332, 301, 334, 390, 330, 320],
                    },
                    {
                        name: '搜索引擎',
                        type: 'line',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'top',
                        },
                        areaStyle: {},
                        emphasis: {
                            focus: 'series',
                        },
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
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
