<template>
  <div class="reword">
    <div class="lottery">
      <div class="reword_box">
        <div class="re_item" @click="handleStart(it)" v-for="it in rewordLst" :key="it.vid">
          <div v-show="it.picked" class="cover_container"></div>
          <img v-show="it.vid === 5" :src="img(it)" alt="" />
          <img v-show="it.vid !== 5" :src="it.award_preview_image_url" alt="" />
        </div>
      </div>
      <img v-show="isShowHand" class="startImg" :src="startImg" alt="" />
      <div class="remaining_count">今日剩余{{ chance_num }}次抽奖机会</div>
      <div class="btn_container">
        <div class="child" @click="handleJumpToRewordList()">
          <img src="../images/my_prize.png" alt="" />
        </div>
        <div class="child">
          <a href="#task_list" @click="handleGetChance('task_list')">
            <img src="../images/get_chance.png" alt="" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const ERR_CODE_MAP = {
  1002: '抽奖次数已用完，做任务赢更多机会',
  1003: '当日抽奖任务已完成，请明日再来',
  1004: '当日抽奖任务已完成，请明日再来'
}
const LOTTERY_LIST = [0, 1, 2, 5, 8, 7, 6, 3]
const INDEX_MAP = {
  0: 0,
  1: 1,
  2: 2,
  3: 5,
  4: 8,
  5: 7,
  6: 6,
  7: 3
}
export default {
  props: {
    chance_num: {
      type: Number,
      default: function() {
        return 0
      }
    },
    total_remian_chances: {
      type: Number,
      default: function() {
        return 0
      }
    },
    rewordLst: {
      type: Array,
      default: function() {
        return []
      }
    },
    activityId: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  computed: {},
  data() {
    return {
      isShowHand: true,
      isDone: true,
      startImg: require('../images/click_start.gif'),
      getLottery: '',
      resPrize: {},
      resPrizeIndex: 0
    }
  },
  created() {
    let isLottery = localStorage.getItem('isLottery')
    this.isShowHand = !isLottery
  },
  mounted() {},
  methods: {
    toast(message, iconClass) {
      Toast({
        message: message
      })
    },
    img(it) {
      if (this.isDone) {
        return it.award_preview_image_url
      }
      return it.lotterying
    },
    pickIndex(val, arr) {
      const remainIndex = val % 8
      return INDEX_MAP[remainIndex]
    },
    handleLottery(val, _prize) {
      setTimeout(() => {
        //TODO:调用抽奖接口
        this.getUserPrize()
      }, 2000)
      // [0, 1, 2, 5, 8, 7, 6, 3] 第一层顺序,index排序
      let prizeIndex = -1
      let prizeIndexArr = []
      let timer = setInterval(() => {
        prizeIndex++ //当前index，累加计算结果
        prizeIndexArr.push(prizeIndex)
        let resIndex = this.pickIndex(prizeIndex, prizeIndexArr) // 旋转时当前index，不累加
        // 更改rewordLst状态
        this.rewordLst[resIndex].picked = true
        this.rewordLst.forEach((it, idx) => {
          if (idx !== resIndex) this.rewordLst[idx].picked = false
        })
        if (this.getLottery === 'award') {
          //// 接口调用成功有奖品
          clearInterval(timer)
          this.continueLotteryGentle(resIndex, this.resPrizeIndex, prizeIndex, prizeIndexArr) //旋转至接口有返回时当前index，接口返回的奖品的index，旋转累记的index，旋转累记的index数组
        } else if (this.getLottery === 'err') {
          //接口异常
          clearInterval(timer)
          this.$toast({
            message: '服务器错误'
          })
        } else if (this.getLottery === 'noAward') {
          //有err_code但无奖品
          clearInterval(timer)
          this.rewordLst.forEach((it, idx) => {
            this.rewordLst[idx].picked = false
          })
          this.$toast({
            message: `${ERR_CODE_MAP[this.resPrize.response.error_code]}`
          })
        }
      }, 100)
    },
    //TODO:平缓转动
    continueLotteryGentle(nowIndex, interfacePrizeIndex, totalIndex, totalIndexArr) {
      // nowIndex,interfacePrizeIndex, totalIndex, totalIndexArr
      // 旋转至接口有返回时当前index，接口返回的奖品的index，旋转累记的index，旋转累记的index数组
      let secondArr = [...totalIndexArr] //有接口返回后旋转累记的index数组
      let secondStartIndex = totalIndex //有接口返回后起始index
      let nowToInterfaceLength = 0
      // console.log('LOTTERY_LIST.indexOf(interfacePrizeIndex)', LOTTERY_LIST.indexOf(interfacePrizeIndex))
      // console.log('LOTTERY_LIST.indexOf(nowIndex)', LOTTERY_LIST.indexOf(nowIndex))
      let len = LOTTERY_LIST.indexOf(interfacePrizeIndex) - LOTTERY_LIST.indexOf(nowIndex)
      nowToInterfaceLength = len >= 0 ? len : len + 8
      // console.log('nowToInterfaceLength', nowToInterfaceLength)
      let timer = setInterval(() => {
        secondStartIndex++
        secondArr.push(secondStartIndex)
        let _resIndex = this.pickIndex(secondStartIndex, secondArr) // 旋转时当前index
        this.rewordLst[_resIndex].picked = true
        this.rewordLst.forEach((it, idx) => {
          if (idx !== _resIndex) this.rewordLst[idx].picked = false
        })
        // 接口调用成功
        let lengthDiff = secondArr.length - totalIndexArr.length
        if (lengthDiff === 8 + nowToInterfaceLength) {
          clearInterval(timer)
          setTimeout(() => {
            this.$emit('getPrize', this.resPrize)
          }, 1000)
        }
      }, 800)
    },

    // TODO:渐变转动
    continueLotteryGradient(nowIndex, interfacePrizeIndex, totalIndex, totalIndexArr) {
      // nowIndex,interfacePrizeIndex, totalIndex, totalIndexArr
      // 旋转至接口有返回时当前index，接口返回的奖品的index，旋转累记的index，旋转累记的index数组
      let secondArr = [...totalIndexArr] //有接口返回后旋转累记的index数组
      let secondStartIndex = totalIndex //有接口返回后起始index
      let nowToInterfaceLength = 0
      let len = LOTTERY_LIST.indexOf(interfacePrizeIndex) - LOTTERY_LIST.indexOf(nowIndex)
      nowToInterfaceLength = len >= 0 ? len : len + 8
      let t = 1000
      let set1 = setInterval(fn, t)
      function fn() {
        t += 100
        secondStartIndex++
        secondArr.push(secondStartIndex)
        let _resIndex = this.pickIndex(secondStartIndex, secondArr) // 旋转时当前index
        this.rewordLst[_resIndex].picked = true
        this.rewordLst.forEach((it, idx) => {
          if (idx !== _resIndex) this.rewordLst[idx].picked = false
        })
        // 接口调用成功
        let lengthDiff = secondArr.length - totalIndexArr.length
        clearInterval(set1)
        if (t < (lengthDiff + 1) * 100 + 1000) {
          set1 = setInterval(fn, t)
          if (lengthDiff === 24 + nowToInterfaceLength) {
            clearInterval(set1)
            setTimeout(() => {
              this.$emit('getPrize', this.resPrize)
            }, 1000)
          }
        }
      }
    },
    getUserPrize() {
      // console.log('this.getLottery', this.getLottery)
      this.getLottery = false
      drawLottery({ qingqing_lottery_activity_id: this.activityId })
        .then((res) => {
          if (res.response.error_code !== 0) {
            this.resPrize = JSON.parse(JSON.stringify(res))
            this.getLottery = 'noAward'
            return
          }
          this.resPrize = JSON.parse(JSON.stringify(res))
          this.getLottery = 'award'
          this.rewordLst.forEach((it, idx) => {
            // 奖品链接匹配
            if (it.award_id === this.resPrize.qingqing_lottery_award_id) {
              this.resPrizeIndex = idx //中奖的index
              // console.log('接口有返回，中奖的奖品的index', this.resPrizeIndex)
            }
          })
        })
        .catch((err) => {
          this.getLottery = 'err'
        })
    },
    handleStart(prize) {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      let _prize = JSON.parse(JSON.stringify(prize))
      if (_prize.vid !== 5) return
      if (this.isDone === false) return
      localStorage.setItem('isLottery', true)
      this.isShowHand = false
      if (this.total_remian_chances === 0) {
        return this.$toast({
          message: '抽奖次数已用完，做任务赢更多机会'
        })
      }
      if (this.chance_num === 0) {
        return this.$toast({
          message: '当日抽奖任务已完成，请明日再来'
        })
      }
      this.handleLottery(1, _prize) // 入参为index+1
    },
    handleGetChance(val) {
      console.log(val)
    },
    handleJumpToRewordList() {
      this.$emit('handleJumpToRewordList')
    },
    handleLogin() {
      this.$emit('handleLogin')
    }
  }
}
</script>

<style lang="less" scoped>
.reword {
  .lottery {
    text-align: center;
    border-radius: 30px;
    padding-top: 342px;
    .reword_box {
      //627*649
      padding: 48px 50px 70px;
      margin: 0 auto;
      width: 627px;
      height: 648px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      background: url('../images/border.png') no-repeat;
      background-size: cover;
      .re_item {
        width: 170px;
        height: 170px;
        margin: auto;
        .cover_container {
          width: 170px;
          height: 170px;
          background: gray;
          position: absolute;
          opacity: 0.5;
          border-radius: 22px;
        }
        img {
          width: 170px;
          height: 170px;
        }
      }
    }
    .startImg {
      width: 120px;
      position: absolute;
      top: 650px;
      left: 50%;
      // transform: translate(-0%, 0);
    }
    .remaining_count {
      width: 500px;
      margin: 40px auto;
      text-align: center;
      color: #fc6743;
      position: absolute;
      top: 900px;
      left: 50%;
      transform: translate(-50%, 0);
    }
    .btn_container {
      margin: -10px auto 20px;
      padding: 0 20px;
      // width: 715px;
      height: 220px;
      display: flex;
      justify-content: space-around;
      background: url('../images/lottery_btn.png') 10px center no-repeat;
      background-size: 98%;
      .child {
        margin-top: 40px;
        img {
          width: 248px;
        }
        a {
          color: inherit;
          text-decoration: none;
          &:active,
          &:link,
          &:visited,
          &:hover {
            text-decoration: none;
          }
        }
      }
    }
  }
}
</style>
