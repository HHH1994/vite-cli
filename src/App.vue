<template>
  <div class="wrap">
    <p>Vite + Vue3</p>
    <img :src="robot" alt="">
    <p>route name :  {{$route.name}}</p>
    <ul>
      <li @click="changeType('/')">1</li>
      <li @click="changeType('/b')">2</li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script lang="jsx" setup>
import {ref, getCurrentInstance} from 'vue'
import {useRouter,} from 'vue-router';
import robot from '@/assets/image/robot.png'

const router = useRouter();


function changeType(type) {
  router.push(type)
  console.log(router.currentRoute)
}

</script>

<style lang="scss" scoped>
div {
  p {
    color: green;
  }
}

li {
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
}
</style>
