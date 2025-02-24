<template>
  <p>虚拟滚动列表</p>
  <!-- 虚拟滚动外层包裹 -->
  <div
    ref="visualWarpper"
    class="visual-list_wrapper"
  >
    <!-- 垫片 总高度 -->
    <div
      class="visual-list_pad"
      :style="{height: `${totalH}px`}"
    />
    <!-- 滚动列表 -->
    <ul
      class="scroll-list"
      :style="{transform: `translateY(${scrollTop}px)`}"
    >
      <li
        v-for="(list, index) of scrollList"
        :key="index"
        class="scroll-list_item"
      >
        {{ list }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import {onBeforeUnmount } from "vue";

const originData = [];
const createList = () => {
    for(let i = 0; i < 100; i++) {
        originData.push(i + 1);
    }
}

const scrollList = reactive([]);

const signleDomHeight = 80;

const totalH = ref(0);

const scrollTop = ref(0);

const viewContainerH = ref(0);

const visualWarpper = ref();

const changeScrollList = (scrollTopVal) => {
    // 当前可视区域最多可显示个数
    const maxDisplayDom = Math.round(viewContainerH.value / signleDomHeight);
    const direct = scrollTopVal - changeScrollList.scrollTop > 0 ? 'down' : 'up';
    const intervalDom = 2;
    const start  = Math.floor(scrollTopVal / signleDomHeight);
    changeScrollList.scrollTop  = scrollTopVal;
    console.log(direct, 'start====',scrollTopVal / signleDomHeight , start, 'changeScrollList.start====', (changeScrollList.start || 0), 'max===', maxDisplayDom)
    // 保证scrollList始终置顶原理：利用translateY偏移量来代替清除掉的数据所占的高度
    // 置顶显示的为第二个元素
    if (direct === 'down'){
      if (start - (changeScrollList.start || 0) >= intervalDom) {
        console.log('start - (changeScrollList.start || 0)=====', start - (changeScrollList.start || 0))
        changeScrollList.start = start - intervalDom + 1;
        scrollTop.value = scrollTopVal - signleDomHeight * intervalDom;

        // 下拉至底部scrollTop值过大时，导致列表无限循环上下抖动处理
        if (changeScrollList.start + maxDisplayDom + intervalDom > originData.length)  {
          changeScrollList.start = originData.length - maxDisplayDom -intervalDom;
          scrollTop.value = totalH.value - viewContainerH.value;
        }
      }
      // 当start = 2 与 start = 0 得到的列表是一样的
      scrollList.splice(0, scrollList.length, ...originData.slice(changeScrollList.start ? changeScrollList.start - 1 : changeScrollList.start, changeScrollList.start + maxDisplayDom + intervalDom))
    } else if(direct === 'up'){
        // 什么时候同步scrollTopVal
        // 什么时候加载新数据
        if (start - changeScrollList.start < intervalDom) {
          if (changeScrollList.start > 0) {
            changeScrollList.start--;
            scrollTop.value = scrollTopVal - signleDomHeight;
          }
        }
        scrollList.splice(0, scrollList.length, ...originData.slice(changeScrollList.start ? changeScrollList.start - 1 : changeScrollList.start, changeScrollList.start + maxDisplayDom + (intervalDom - 1)))
    }

    if (start < (intervalDom + 1)) {
        scrollTop.value = 0;
    }
}

changeScrollList.start = 0;
changeScrollList.scrollTop = 0;

const scrollHandler = function(){
    console.log(this.scrollTop)
   if (scrollHandler.timer) {
    clearTimeout(scrollHandler.timer);
   }

   scrollHandler.timer = setTimeout(() => {
    changeScrollList(this.scrollTop);
   }, 0)
}

onMounted(() => {
    createList();
    totalH.value = originData.length * 80;
    
    const visualWarpperDom = visualWarpper.value;
    viewContainerH.value = visualWarpperDom.offsetHeight;

    changeScrollList(0)
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