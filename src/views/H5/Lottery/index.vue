<template>
    <div class="lottery_container">
        <div class="lottery_box">
            <div class="re_item" @click="handleStart(it)" v-for="it in rewordLst" :key="it.id">
                <div v-show="it.picked" class="cover_container"></div>
                <img :src="showImg(it)" alt="" />
            </div>
        </div>

        <el-dialog
            :visible.sync="centerDialogVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            width="400px"
            center>
                <div style="text-align: center;">
                    <h2>恭喜您获得：{{award.awardName}}</h2>
                    <br>
                    <img :src="award.imgUrl" alt="">
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="handleClose">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
const LOTTERY_LIST = [0, 1, 2, 5, 8, 7, 6, 3]
const LOTTERYRESULT = {
    AWARD: 'AWARD',
    ERR: 'ERR',
    NOAWARD: 'NOAWARD',
}
const INDEX_MAP = {
    0: 0,
    1: 1,
    2: 2,
    3: 5,
    4: 8,
    5: 7,
    6: 6,
    7: 3,
}
const REWORDLIST = [
    {
        id: '1',
        awardName: '一节正式课',
        imgUrl: require('../images/1jie.png'),
    },
    {
        id: '2',
        awardName: '四节答疑课',
        imgUrl: require('../images/4jie.png'),
    },
    {
        id: '3',
        awardName: '100元优惠券',
        imgUrl: require('../images/100yuan.png'),
    },
    {
        id: '4',
        awardName: '188轻豆',
        imgUrl: require('../images/188qingdou.png'),
    },
    {
        id: '5',
        awardName: '8节正式课',
        imgUrl: require('../images/8jie.png'),
    },
    {
        id: '6',
        awardName: '88轻豆',
        imgUrl: require('../images/88qingdou.png'),
    },
    {
        id: '7',
        awardName: 'iPad',
        imgUrl: require('../images/ipad.png'),
    },
    {
        id: '8',
        awardName: '米家护眼灯',
        imgUrl: require('../images/light.png'),
    },
]
export default {
    props: {},
    computed: {},
    data() {
        return {
            isDone: true,
            rewordLst: this.initialization(REWORDLIST),
            centerDialogVisible: false,
            award: {},
            resAwardId: '',
            getLotteryResult: '',
        }
    },
    created() {},
    mounted() {},
    methods: {
        // 随机数，用于模拟接口生成奖品
        getRandom(lower, upper) {
            // eslint-disable-next-line no-mixed-operators
            return Math.floor(Math.random() * (upper - lower + 1)) + lower
        },
        handleStart(val){
            if (!this.isDone) return
            this.handleLottery()
        },
        pickIndex(val, arr) {
            const remainIndex = val % 8
            return INDEX_MAP[remainIndex]
        },
        // 获取中奖后奖品相关信息
        getPrizeMockInterface(){
            this.resAwardId = this.getRandom(1, 8)
            console.log('中奖奖品ID', this.resAwardId)
            this.resPrizeIndex = this.searchIndexById(this.resAwardId)
            console.log('中奖奖品位置', this.resPrizeIndex)
            this.award = this.searchRewordById(this.resAwardId)
            console.log('中奖奖品', this.award)
            this.getLotteryResult = LOTTERYRESULT.AWARD
        },
        // 根据id匹配奖品属性
        searchRewordById(val) {
            let res = {}
            REWORDLIST.forEach((it, idx) => {
                if (it.id === String(val)){
                    res = it
                }
            })
            return res
        },
        // 根据id匹配奖品index
        searchIndexById(val) {
            let resIdx
            this.rewordLst.forEach((it, idx) => {
                if (it.id === String(val)) {
                    resIdx = idx // 中奖的index
                }
            })
            return resIdx
        },
        handleLottery() {
            this.isDone = false
            setTimeout(() => {
                this.getPrizeMockInterface()
            }, 1000)
            let prizeIndex = -1
            const prizeIndexArr = []
            const timer = setInterval(() => {
                prizeIndex += 1 // 当前index，累加计算结果
                prizeIndexArr.push(prizeIndex)
                const resIndex = this.pickIndex(prizeIndex, prizeIndexArr) // 旋转时当前index，不累加
                // 更改rewordLst状态
                this.rewordLst[resIndex].picked = true
                this.rewordLst.forEach((it, idx) => {
                    if (idx !== resIndex) this.rewordLst[idx].picked = false
                })
                if (this.getLotteryResult === LOTTERYRESULT.AWARD) {
                    // // 接口调用成功有奖品
                    clearInterval(timer)
                    this.continueLotteryGradient(resIndex, this.resPrizeIndex, prizeIndex, prizeIndexArr)
                } else if (this.getLotteryResult === LOTTERYRESULT.ERR) {
                    // 接口异常
                    // clearInterval(timer)
                } else if (this.getLotteryResult === LOTTERYRESULT.NOAWARD) {
                    // 未中奖
                    // clearInterval(timer)
                }
            }, 100)
        },
        continueLotteryGradient(nowIndex, interfacePrizeIndex, totalIndex, totalIndexArr) {
            const self = this
            // 旋转至接口有返回时当前index，接口返回的奖品的index，旋转累记的index，旋转累记的index数组
            const secondArr = [...totalIndexArr] // 有接口返回后旋转累记的index数组
            let secondStartIndex = totalIndex // 有接口返回后起始index
            let nowToInterfaceLength = 0
            const len = LOTTERY_LIST.indexOf(interfacePrizeIndex) - LOTTERY_LIST.indexOf(nowIndex) // 接口有返回是index与奖品index间距
            nowToInterfaceLength = len > 0 ? len : len + 8
            nowToInterfaceLength = nowToInterfaceLength < 4 ? nowToInterfaceLength + 8 : nowToInterfaceLength
            let gap = 60
            const timer = 60
            let maxGap
            // eslint-disable-next-line no-use-before-define
            let set1 = setInterval(fn, gap)
            function fn() {
                secondStartIndex += 1
                secondArr.push(secondStartIndex)
                // eslint-disable-next-line no-underscore-dangle
                const _resIndex = self.pickIndex(secondStartIndex, secondArr)
                // eslint-disable-next-line no-underscore-dangle
                self.rewordLst[_resIndex].picked = true
                self.rewordLst.forEach((it, idx) => {
                    if (idx !== _resIndex) self.rewordLst[idx].picked = false
                })
                gap += timer
                clearInterval(set1)
                maxGap = nowToInterfaceLength * timer
                if (gap === maxGap + timer) {
                    setTimeout(() => {
                        setTimeout(() => {
                            self.centerDialogVisible = true
                        }, 1000)
                        self.isDone = true
                        self.rewordLst.forEach((it, idx) => {
                            self.rewordLst[idx].picked = false
                        })
                    }, maxGap)
                }
                if (gap <= maxGap) {
                    set1 = setInterval(fn, gap)
                }
            }
        },
        // 初始化处理奖品
        initialization(list){
            // eslint-disable-next-line no-underscore-dangle
            const _list = list.concat()
            _list.splice(4, 0, {
                id: '',
                awardName: '立即抽奖',
                imgUrl: require('../images/start_lottery.png'),
                vid: '5',
                lotteryingImgUrl: require('../images/lotterying.png'),
            })
            _list.forEach((it, idx) => {
                // eslint-disable-next-line no-param-reassign
                it.vid = idx + 1
                // eslint-disable-next-line no-param-reassign
                it.picked = false
            })
            return _list
        },
        // 关闭弹窗
        handleClose() {
            this.centerDialogVisible = false
            window.location.reload()
        },
        showImg(it){
            // eslint-disable-next-line eqeqeq
            if (it.vid == 5){
                if (!this.isDone) return it.lotteryingImgUrl
            }
            return it.imgUrl
        },
    },
}

</script>

<style lang="less" scoped>
@comImgBoxWidth: 180px;
.lottery_container {
    // border: 1px solid red;
    width: 100%;
    height: auto;
    .lottery_box{
        width: 589px;
        height: 589px;
        border: 1px solid red;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 8px;
        .re_item{
            width: @comImgBoxWidth;
            margin: auto;
            border: 1px solid red;
            .cover_container{
                width: @comImgBoxWidth;
                height: @comImgBoxWidth;
                background: gray;
                position: absolute;
                opacity: 0.5;
                border-radius: 24px;
            }
            img{
                width: @comImgBoxWidth;
                height: @comImgBoxWidth;
            }
        }
    }
}
</style>
