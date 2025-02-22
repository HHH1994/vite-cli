<template>
  <div>
    <template v-for="(product, idx) of productList" :key="idx">
      <p>{{product}}</p>
    </template>
    <span :ref="el => a = el">{{value.name}}</span>
    <el-button @click="addProduct">add</el-button>
    <el-button @click="delProduct">del</el-button>
    <el-button @click="changeProduct">change</el-button>
    <el-button @click="changeValue">change2</el-button>
  </div>
</template>

<script setup>
import {onMounted, reactive, readonly, ref} from 'vue';


const productList = reactive([]);

const a  = ref()

const addProduct = function() {
  // proxy get  =>  proxy set => proxy get
  productList.push(Math.random());
}

const delProduct = function() {
  // proxy get  =>  proxy set => proxy get
  productList.length--;
}

const changeProduct = function() {
  // proxy特性
  productList[0] = '变';
}

const r = ref([1]);
const b = reactive({c: r});
 
function useDebounce(obj, duration) {
  let reactiveVal = reactive(obj);
  const value = readonly(reactiveVal);
  const setValue = (newObj) => {
    if (setValue.timer) {
      clearTimeout(setValue.timer);
    }

    setValue.timer = setTimeout(() => {
      reactiveVal = Object.assign(reactiveVal, newObj);
    }, duration)
  }

  console.log('value', value)

  return {
    value,
    setValue
  }
}

const {value, setValue} = useDebounce({name: 'bane'}, 1000);
const changeValue = () => {
  if (!changeValue.count) {
    changeValue.count = 0;
  }
  setValue({name: ++changeValue.count})
}

onMounted(() => {
  console.log('a',  a)
})
</script>

<style>
p {
  margin-bottom: 10px;
}
</style>