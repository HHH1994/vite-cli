<template>
  <div class="c1">
      动态组件1{{count}}
      <el-button @click="add">按钮</el-button>
  </div>
</template>
<script lang="tsx" setup>
import {Ref, ref, getCurrentInstance} from 'vue';

const count:Ref = ref(0);
console.log(getCurrentInstance())
function add():void {
  count.value++;
}

</script>
<style lang="scss" scoped>
  .c1 {
    color: $color-primary;
  }
</style>