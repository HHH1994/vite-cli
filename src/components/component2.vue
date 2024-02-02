<template>
  <div>
      动态组件2
      <div>{{x}},{{y}}</div>
  </div>
</template>
<script setup>
import {getCurrentInstance} from 'vue';
import useMouse from '@/useEffect/useMouse.ts';
console.log(getCurrentInstance())
const {x, y} = useMouse();
</script>
<style lang="scss" scoped>
</style>