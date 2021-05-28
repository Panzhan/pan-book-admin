<template>
    <div class="container">
        <canvas id="drawing" width="400" height="400">A drawing of something.</canvas>
        <canvas id="drawingWithBg" width="400" height="400">A drawing of something.</canvas>
        <canvas id="drawingWithoutBg" width="400" height="400">A drawing of something.</canvas>
    </div>
</template>
<script>
export default {
    data() {
        return {
            myImg: 'https://upload.jianshu.io/users/upload_avatars/4041074/79878f31-c8ae-4087-880c-bc2185837f1d.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/80/h/80/format/webp',
            qrCode: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2877499757,3239316825&fm=224&gp=0.jpg'
        }
    },
    created() {},
    mounted() {
        this.getDrawingWithBg()
        this.getDrawingWithoutBg()
        this.getDrawing()
    },
    methods: {
        getDrawing(){
            let that = this
            const drawing = document.getElementById("drawing")
            const context = drawing.getContext("2d");
            const img = new Image()
            img.src = that.myImg
            img.onload = function() {
                context.clearRect(10, 10, 300, 300); 
                context.drawImage(img, 10, 10, 300, 300); 
                const qrCode = new Image()
                qrCode.src = that.qrCode
                qrCode.onload = function(){
                    context.drawImage(qrCode, 200, 200, 80, 80); 
                }
            }
        },
        getDrawingWithBg() {
            const context = drawingWithBg.getContext("2d");
            context.fillStyle = "#ff0000";
            context.fillRect(10, 10, 100, 100);
            // 绘制半透明的蓝色矩形
            context.fillStyle = "rgba(0,0,255,0.5)";
            context.fillRect(30, 30, 100, 100);
        },
        getDrawingWithoutBg(){
            const context = drawingWithoutBg.getContext("2d");
            context.strokeStyle = "#ff0000";
            context.strokeRect(10, 10, 100, 100);
            // 绘制半透明的蓝色矩形
            context.strokeStyle = "rgba(0,0,255,0.5)";
            context.strokeRect(30, 30, 100, 100);
        }
    }
}
</script>
<style lang="less" scoped>
.container {
    width: 100%;
    height: 100%;
    border: 1px solid red;
}
</style>
