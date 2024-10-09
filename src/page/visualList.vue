<template>
    <p>虚拟滚动列表</p>
    <!-- 虚拟滚动外层包裹 -->
    <div ref="visualWarpper" class="visual-list_wrapper">
        <!-- 垫片 总高度 -->
        <div class="visual-list_pad" :style="{height: `${totalH}px`}"></div>
        <!-- 滚动列表 -->
        <ul class="scroll-list" :style="{transform: `translateY(${scrollTop}px)`}">
            <li v-for="(list, index) of scrollList" :key="index" class="scroll-list_item">{{list}}</li>
        </ul>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";

const originData = [];
const createList = () => {
    for(let i = 0; i < 100; i++) {
        originData.push(i + 1);
    }
}

const scrollList = reactive([]);

const totalH = ref(0);

const scrollTop = ref(0);

const viewContainerH = ref(0);

const visualWarpper = ref();

const changeScrollList = () => {
    const max = Math.ceil(viewContainerH.value / 80);
    const start = Math.floor(scrollTop.value / 80);
    scrollList.splice(0, max, ...originData.slice(start, start + max))
}

const scrollHandler = function(){
    console.log(this.scrollTop)
   if (scrollHandler.timer) {
    clearTimeout(scrollHandler.timer);
   }

   scrollHandler.timer = setTimeout(() => {
    scrollTop.value = this.scrollTop;
    changeScrollList()
   }, 0)
}

onMounted(() => {
    createList();
    totalH.value = originData.length * 80;
    
    const visualWarpperDom = visualWarpper.value;
    viewContainerH.value = visualWarpperDom.offsetHeight;

    changeScrollList()
    visualWarpperDom.addEventListener('scroll', scrollHandler)
})

onBeforeUnmount(() => {
    visualWarpper.value.removeEventListener('scroll', scrollHandler)
})



</script>
<style lang="scss" scoped>
.visual-list_wrapper {
    position: relative;
    width: 100%;
    height: 95%;
    background: #fff;
    overflow: auto;

    .scroll-list {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;

        &_item {
            width: 100%;
            height: 80px;
            line-height: 80px;
            padding: 10px;
            box-sizing: border-box;
            font-size: 14px;
            
            &:not(:last-child) {
                border-bottom: 1px solid;
            }
        }
    }
}
</style>