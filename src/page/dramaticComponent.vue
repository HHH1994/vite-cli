<template>
  <div>
    <component v-for="(component, index) of componentList" :key="index" :is="component"></component>
  </div>
</template>
<script setup>
import {reactive, defineAsyncComponent} from 'vue'

const modules = import.meta.glob('../components/test*.*', { eager: true });

const componentList = reactive([]);

Object.keys(modules).forEach(key => {
  // 使用component.name做逻辑判断可使用如下
  // 不建议,使用私有属性容易后面升级时出现破坏性改动
  // defineAsyncComponent(modules[key]).__asyncLoader().then(com => {
  //   console.log(com.name)
  //   componentList.push(com)
  // })

  componentList.push(modules[key].default)
})
</script>
<style lang="scss" scoped>
</style>