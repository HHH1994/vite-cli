<template>
    <div>
        <test1 v-model="modelRef" v-model:title="modelRef"></test1>
        <span @click="change">change</span>
    </div>
</template>
<script setup>
import {ref} from 'vue';
import test1 from '../components/test1.vue';

const modelRef = ref();

console.log(modelRef.value);
const change = () => {
    modelRef.value = 'parent.change';
}
</script>