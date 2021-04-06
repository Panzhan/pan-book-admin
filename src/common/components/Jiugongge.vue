<template>
  <div>
    <div class="reword_box">
      <div 
        class="re_item" 
        :class="it.picked ? 're_border' : ''"
        @click="handleStart(it)" 
        v-for="it in rewordLst" 
        :key="it.id"
      >
        {{it.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      rewordLst: [
        {
          id:1,
          name: '111',
          picked: false
        },
        {
          id:2,
          name: '222',
          picked: false
        },
        {
          id:3,
          name: '333',
          picked: false
        },
        {
          id:4,
          name: '444',
          picked: false
        },
        {
          id:5,
          name: '点击开始',
          picked: false
        },
        {
          id:6,
          name: '666',
          picked: false
        },
        {
          id:7,
          name: '777',
          picked: false
        },
        {
          id:8,
          name: '888',
          picked: false
        },
        {
          id:9,
          name: '999',
          picked: false
        }
      ],
      isDone: true
    }
  },
  methods: {
    count(val){
      let arr = [0,1,2,5,8,7,6,3] // 第一层顺序,index排序
      let doubleArr = [...arr,...arr,...arr,...arr] //两层
      let idx = arr.indexOf(val-1) //找到选中元素位置
      // console.log('返回奖品的index',idx)
      let resitem = [] // 存放元素距离起始位置元素中间间隔所有元素
      arr.forEach((it,index)=>{
        if(index<=idx) resitem.push(it)
      })
      // console.log('resitem',resitem)
      doubleArr = [...doubleArr, ...resitem] //将存放元素距离起始位置元素中间间隔所有元素合并到两层数组中去
      console.log('doubleArr',doubleArr)
      // foreach 同let
      doubleArr.forEach((element,index) => {
        this.isDone=false
        s=0
        setTimeout(() => {
          this.rewordLst[element].picked=true
          this.rewordLst.forEach((it,idx)=>{
            if(idx !==element) this.rewordLst[idx].picked = false
          })
          s++
          console.log("s",s)
          if(s===doubleArr.length){
            this.isDone=true
          }
        }, this.handleSetTime(index))
      })
    },
    handleSetTime(index) {
      let t = 0
      if(index<=24) {
        t = 100*index
      }else{
        t = (index-20)*(index-1)*(index-4)
      }
      console.log('ttt',t);
      return t 
    },
    handleStart(it) {
      if(it.id !== 5) return
      if(this.isDone === false) return 
      this.count(3) // 入参为index+1
    },
  }
}
</script>

<style lang='less'>
  .reword_box{
    margin: auto;
    margin-top: 100px;
    width: 400px;
    height: 400px;
    background: gray;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .re_item{
      width: 130px;
      border: 1px solid black;
    }
    .re_border{
      background: red;
    }
  }
</style>