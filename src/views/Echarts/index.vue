<template>
    <div class="echarts">
        <!-- 柱状图 -->
        <Histogram :estyle='estyle'></Histogram>
        <!-- 折线图 -->
        <LineChart :estyle='estyle'></LineChart>
        <!-- 区域面积图 -->
        <RegionalFigure :estyle='estyle'></RegionalFigure>
        <!-- 漏斗图 -->
        <FunnelFigureChart :estyle='estyle'></FunnelFigureChart>
        <!-- 饼图 -->
        <PieChart :estyle='estyle'></PieChart>
        <!-- 柱状对比图 -->
        <HistogramComparison :estyle='estyle'></HistogramComparison>
        <!-- 多曲线图 -->
        <ManyGraph :estyle='estyle'></ManyGraph>
    </div>
</template>

<script>
import Histogram from './components/histogram'
import LineChart from './components/lineChart'
import RegionalFigure from './components/regionalFigure'
import FunnelFigureChart from './components/funnelFigure'
import PieChart from './components/pieChart'
import HistogramComparison from './components/histogramComparison'
import ManyGraph from './components/manyGraph'

const width = 500
export default {
    name: 'echarts',
    components: {
        Histogram,
        LineChart,
        RegionalFigure,
        FunnelFigureChart,
        PieChart,
        HistogramComparison,
        ManyGraph,
    },
    data() {
        return {
            estyle: {
                width: `${width}px`,
                height: `${width}px`,
                border: '1px solid red',
            },
        }
    },
    created() { },
    mounted() { },
    methods: { },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.echarts{
    background: rgb(219, 219, 219);
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    div:nth-child(n){
        margin: 40px 30px
    }
}
</style>
