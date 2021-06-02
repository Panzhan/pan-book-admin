// 基于数组封装队列（单向队列）
// 先进为队首
function Queue() {
    this.data = []      //队列数据
    this.enqueue = enqueue      // 队尾添加元素
    this.dequeue = dequeue      // 队首删除元素
    this.front = front      // 读取队首元素
    this.back = back        // 读取队尾元素
    this.toStringData = toStringData        // 显示对内元素
    this.isEmpty = isEmpty      // 判断队列是否为空

    // enqueue 方法
    function enqueue(element) {
        this.data.push(element)
    }
    // dequeue 方法
    function dequeue() {
        return this.data.shift()
    }
    // front 方法
    function front(){
        return this.data[0]
    }
    // back 方法
    function back() {
        return this.data[this.data.length - 1]
    }
    // toStringData 方法
    function toStringData() {
        return this.data
    }
    // isEmpty 方法
    function isEmpty() {
        return this.data.length === 0
    }
}

// test 
const myQueue = new Queue()
myQueue.enqueue(1)
myQueue.enqueue(2)
myQueue.enqueue(3)
myQueue.enqueue(4)
myQueue.dequeue()
console.log('front', myQueue.front())
console.log('toStringData', myQueue.toStringData())
console.log('back', myQueue.back())
console.log('myQueue', myQueue.data)