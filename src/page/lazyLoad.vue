<template>
  <div ref="pwrap" class="wrap">
    <p class="place">向下滚动</p>
    <!-- case 1 -->
    <lazyComponent :root="pwrap">
        <test1></test1>
    </lazyComponent>
    <!-- case 2 -->
    <lazyComponent v-if="isShow" :root="pwrap">
        <test1></test1>
        <template  #skelton>
            <div class="skelton-content">骨架屏内容</div>
        </template>
    </lazyComponent>
  </div>
</template>
<script setup>
import lazyComponent from '@/components/intersectionObsever.vue';
import {defineAsyncComponent, onMounted, ref} from 'vue';

const test1 = defineAsyncComponent(() => import('@/components/test1.vue'));

const pwrap = ref(null);

// case 2
const isShow = ref(false);

onMounted(() => {
    isShow.value = true;
})

</script>
<style lang="scss" scoped>
.wrap {
    width: 100%;
    height: 600px;
    overflow: auto;

    .place {
        height: 500px;
    }

    .skelton-content {
        height: 500px;
        background: #fff;
        font-size: 18px;
    }
}
</style>