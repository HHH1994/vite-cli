<template>
  <div ref="pwrap" class="wrap">
    <p class="place">向下滚动</p>
    <lazyComponent :root="pwrap">
        <test1></test1>
    </lazyComponent>
  </div>
</template>
<script setup>
import lazyComponent from '@/components/intersectionObsever.vue';
import {defineAsyncComponent, ref} from 'vue';

const test1 = defineAsyncComponent(() => import('@/components/test1.vue'));

const pwrap = ref(null);

</script>
<style lang="scss" scoped>
.wrap {
    width: 100%;
    height: 300px;
    overflow: auto;

    .place {
        height: 500px;
    }
}
</style>